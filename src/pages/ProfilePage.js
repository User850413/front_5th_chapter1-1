import Footer from "../components/Footer";
import Header from "../components/Header";
import { render } from "../main";
import user from "../store/user";

const ProfilePage = () => {
  const template = () => `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      ${Header().template()}
  
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="홍길동"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="hong@example.com"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                >
  안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
  
      ${Footer}      
      </div>
    </div>
  </div>
  `;

  const action = () => {
    const userState = user.getIsLoggedIn();
    if (!userState) {
      render("/login");
    } else {
      Header().action();
    }

    // NOTE : 프로필 수정 로직
    if (user.getIsLoggedIn()) {
      let userData = JSON.parse(localStorage.getItem("user"));

      document.getElementById("username").value = userData.username;
      document.getElementById("bio").value = userData.bio;
      document.getElementById("email").value = userData.email;

      const profileForm = document.getElementById("profile-form");
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const profileData = new FormData(profileForm);

        const username = profileData.get("username") + "";
        const email = profileData.get("email") + "";
        const bio = profileData.get("bio") + "";

        userData = { username, email, bio };

        localStorage.setItem("user", JSON.stringify(userData));
      });
    }
  };

  return { template, action };
};

export default ProfilePage;

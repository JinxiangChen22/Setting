// Translation system
const translations = {
  en: {
    homePage: "HOME",
    goalSettingPage: "Goal Setting", 
    readingHistoryPage: "Reading History",
    settingsPage: "Settings",
    userProfilePage: "User Profile",
    // Add all other translations from data-translate values
  },
  zh: {
    homePage: "首页",
    goalSettingPage: "目标设置",
    readingHistoryPage: "阅读历史",
    settingsPage: "设置",
    userProfilePage: "用户资料"
  }
};

let currentLanguage = 'en';

function updateTranslations() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[currentLanguage][key]) {
      el.textContent = translations[currentLanguage][key];
    }
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (translations[currentLanguage][key]) {
      el.placeholder = translations[currentLanguage][key];
    }
  });
}

// 头像上传预览
document
  .getElementById("avatarUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileAvatar").src = e.target.result;
        document.getElementById("profileAvatar").style.display = "block";
        document.getElementById("avatarPlaceholder").style.display = "none";

        // 更新顶部的头像
        document.querySelector(".user-avatar img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// 点击占位符触发文件选择
document
  .getElementById("avatarPlaceholder")
  .addEventListener("click", function () {
    document.getElementById("avatarUpload").click();
  });

// 显示修改用户名页面
function showChangeUsernamePage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "block";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示修改密码页面
function showChangePasswordPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "block";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示阅读历史页面
function showReadingHistoryPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "block";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Reading History";
}

// 返回用户资料页面
function showProfilePage() {
  document.getElementById("profilePage").style.display = "block";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示 My Book 页面
function showMyBookPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "block";
  document.getElementById("pageTitle").textContent = "My Book";
}

// 更新用户名
function updateUsername() {
  const newUsername = document.getElementById("newUsername").value;
  if (newUsername) {
    alert("用户名已成功更新为: " + newUsername);
    document.getElementById("usernameDisplay").textContent =
      "User Name: " + newUsername;
    showProfilePage();
  } else {
    alert("请输入新用户名");
  }
  document.getElementById("greetingUser").textContent = "Hi, " + newUsername;
}

// 更新密码
function updatePassword() {
  const verificationCode = document.getElementById("verificationCode").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!verificationCode) {
    alert("请输入验证码");
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    alert("密码长度至少为6位");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }

  alert("密码已成功更新");
  showProfilePage();
}

// 导航栏点击事件
document.querySelectorAll(".nav-links li").forEach((item) => {
  item.addEventListener("click", function () {
    hideAllPages(); // 隐藏所有页面
    // 移除所有导航项的激活状态
    document.querySelectorAll(".nav-links li").forEach((navItem) => {
      navItem.classList.remove("active");
    });

    // 添加当前导航项的激活状态
    this.classList.add("active");
    

    // 获取对应页面的ID
    const pageId = this.getAttribute("data-page");

    // 隐藏所有页面
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("changeUsernamePage").style.display = "none";
    document.getElementById("changePasswordPage").style.display = "none";
    document.getElementById("readingHistoryPage").style.display = "none";
    document.getElementById("myBookPage").style.display = "none";

    // 显示对应页面并更新页面标题
    switch (pageId) {
      case "home":
        hideAllPages();
        document.getElementById("homePage").style.display = "block";
        document.getElementById("pageTitle").textContent = "Home";
        break;
      case "user-profile":
        showProfilePage();
        break;
      case "my-book":
        showMyBookPage();
        document.getElementById("pageTitle").textContent = "My Book";
        break;
      case "goal-setting":
        hideAllPages();
        document.getElementById("goalSettingPage").style.display = "block";
        document.getElementById("pageTitle").textContent = "Goal Setting";
        break;
      case "reading-history":
        showReadingHistoryPage();
        document.getElementById("pageTitle").textContent = "Reading History";
        break;
      // case "settings":
      //   document.getElementById("pageTitle").textContent = "Settings";
      //   break;
      case "settings":
        // hideAllPages(); 
        showSettingsPage(); 
        document.getElementById("pageTitle").textContent = "Settings"; 
        break; 
    }
  });
});

// 为“Log out”项添加点击事件监听器
document
  .getElementById("logoutItem")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "signin.html";
  });

document.addEventListener("DOMContentLoaded", function () {
  // 获取历史记录容器
  const historyContainer = document.getElementById("history");

  // 渲染历史记录
  function renderHistory(data) {
    historyContainer.innerHTML = ""; // 清空历史记录容器

    if (data.length === 0) {
      // 如果没有历史记录，显示提示信息
      const noHistoryMessage = document.createElement("div");
      noHistoryMessage.classList.add("no-history-message");
      noHistoryMessage.textContent =
        "There is no historical record for the time being.";
      historyContainer.appendChild(noHistoryMessage);
    } else {
      // 如果有历史记录，正常渲染
      data.forEach((item) => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");

        const dateHeader = document.createElement("h2");
        dateHeader.textContent = item.date;
        historyItem.appendChild(dateHeader);

        const bookList = document.createElement("div");
        bookList.classList.add("book-list");

        item.books.forEach((book) => {
          const bookElement = document.createElement("div");
          bookElement.classList.add("book");

          const bookImage = document.createElement("img");
          bookImage.src = book.cover;
          bookImage.alt = "Book Cover";
          bookElement.appendChild(bookImage);

          const bookTitle = document.createElement("span");
          bookTitle.textContent = book.title;
          bookElement.appendChild(bookTitle);

          bookList.appendChild(bookElement);
        });

        historyItem.appendChild(bookList);
        historyContainer.appendChild(historyItem);
      });
    }
  }

  // 从服务器获取历史记录
  function fetchHistory() {
    fetch("/api/history") // 假设您的API端点是'/api/history'
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        renderHistory(data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        const noHistoryMessage = document.createElement("div");
        noHistoryMessage.classList.add("no-history-message");
        noHistoryMessage.textContent = "Failed to load history.";
        historyContainer.appendChild(noHistoryMessage);
      });
  }

  // 筛选历史记录
  function filterHistory() {
    const filterValue = document.getElementById("filter-select").value;
    let filteredData = historyData;

    switch (filterValue) {
      case "week":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return date >= new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
        });
        break;
      case "month":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return date >= new Date(new Date().getTime() - 30 * 24 * 3600 * 1000);
        });
        break;
      case "year":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return (
            date >= new Date(new Date().getTime() - 365 * 24 * 3600 * 1000)
          );
        });
        break;
      default:
        filteredData = historyData;
    }

    // 按时间顺序排序
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 渲染筛选后的数据
    renderHistory(filteredData);
  }

  // 监听筛选器的变化
  document
    .getElementById("filter-select")
    .addEventListener("change", filterHistory);

  // 初始化渲染全部历史记录
  fetchHistory();

  // 监听搜索按钮的点击事件
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
      const historyItems = document.querySelectorAll(".history-item");

      // 默认显示所有历史记录
      historyItems.forEach((item) => {
        item.style.display = "block";
      });

      // 如果搜索框有内容，则进一步筛选
      if (searchInput) {
        historyItems.forEach((item) => {
          const bookTitles = Array.from(item.querySelectorAll("span")).map(
            (el) => el.textContent.toLowerCase()
          );
          if (bookTitles.some((title) => title.includes(searchInput))) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
});

// 显示创建阅读日志表单
function showReadingLogForm() {
  document.getElementById("readingLogForm").style.display = "flex";
}

// 隐藏创建阅读日志表单
function hideReadingLogForm() {
  document.getElementById("readingLogForm").style.display = "none";
}

// 创建阅读日志
function createReadingLog() {
  const bookTitle = document.getElementById("bookTitle").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const readingDate = document.getElementById("readingDate").value;
  const bookReview = document.getElementById("bookReview").value;
  const bookCover = document.getElementById("bookCoverPreview").src;

  if (!bookTitle || !bookAuthor || !readingDate) {
    alert("请填写书名、作者和阅读日期");
    return;
  }

  // 创建书籍卡片
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.dataset.title = bookTitle;
  bookCard.dataset.author = bookAuthor;
  bookCard.dataset.date = readingDate;
  bookCard.dataset.review = bookReview;
  bookCard.dataset.cover = bookCover;
  bookCard.innerHTML = `
    <img src="${
      bookCover || "https://via.placeholder.com/200"
    }" alt="${bookTitle}">
    <div class="book-info">
      <div class="book-title">${bookTitle}</div>
      <div class="book-author">${bookAuthor}</div>
    </div>
  `;

  // 添加点击事件
  bookCard.addEventListener("click", function () {
    showBookDetails();
    // 同时更新详情页内容
    document.getElementById("bookTitle").textContent = this.dataset.title;
    document.getElementById("bookAuthor").textContent = this.dataset.author;
    document.getElementById("bookDate").textContent = this.dataset.date;
    document.getElementById("bookReview").textContent = this.dataset.review;
    document.getElementById("bookCover").src = this.dataset.cover;
  });

  // 获取书籍网格
  const favouriteBooks = document.getElementById("favouriteBooks");

  // 将按钮移到最后
  const addBookBtn = document.querySelector(".add-book-btn");
  if (addBookBtn) {
    favouriteBooks.appendChild(addBookBtn);
  }

  // 添加书籍卡片
  favouriteBooks.insertBefore(bookCard, addBookBtn);

  // 将数据存储到 localStorage
  const bookData = {
    title: bookTitle,
    author: bookAuthor,
    date: readingDate,
    review: bookReview,
    cover: bookCover,
  };
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  books.push(bookData);
  localStorage.setItem("books", JSON.stringify(books));

  // 隐藏表单并重置输入
  hideReadingLogForm();
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("readingDate").value = "";
  document.getElementById("bookReview").value = "";
  document.getElementById("bookCoverPreview").style.display = "none";
  document.getElementById("uploadPlaceholder").style.display = "flex";
}

// 显示阅读记录详情
function showReadingDetails(title, author, date, review) {
  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailAuthor").textContent = `Author: ${author}`;
  document.getElementById("detailDate").textContent = `Reading Date: ${date}`;
  document.getElementById("detailReview").textContent = `Review: ${review}`;
  document.getElementById("readingDetails").style.display = "flex";
}

// 关闭阅读记录详情
function closeReadingDetails() {
  document.getElementById("readingDetails").style.display = "none";
}

// 上传书籍封面
document
  .getElementById("bookCoverUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("bookCoverPreview").src = e.target.result;
        document.getElementById("bookCoverPreview").style.display = "block";
        document.getElementById("uploadPlaceholder").style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

// 点击加号按钮触发文件选择
document
  .getElementById("uploadPlaceholder")
  .addEventListener("click", function () {
    document.getElementById("bookCoverUpload").click();
  });

//目标选择更新
// 在现有JavaScript末尾添加以下代码
// 目标管理功能
let currentGoalId = null;
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// 初始化测量单位选择
document.querySelectorAll('.measurement-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.measurement-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// 创建新目标
function createNewGoal() {
  const goal = {
    id: Date.now(),
    name: document.getElementById('goalName').value,
    unit: document.querySelector('.measurement-btn.active').dataset.unit,
    target: parseInt(document.getElementById('targetValue').value),
    start: document.getElementById('startDate').value,
    end: document.getElementById('endDate').value,
    cover: document.getElementById('goalCoverPreview').style.backgroundImage || '',
    progress: 0,
    completed: false
  };

  if (!validateGoal(goal)) return;

  goals.push(goal);
  localStorage.setItem('goals', JSON.stringify(goals));
  renderGoals();
  clearGoalForm();
}

function validateGoal(goal) {
  if (!goal.name || !goal.target || !goal.start || !goal.end) {
    alert('Please fill all required fields');
    return false;
  }
  if (new Date(goal.start) > new Date(goal.end)) {
    alert('End date cannot be earlier than start date');
    return false;
  }
  return true;
}

// 渲染目标看板
function renderGoals() {
  const grid = document.getElementById('goalGrid');
  grid.innerHTML = '';

  goals.forEach(goal => {
    const progressPercent = Math.min(Math.round((goal.progress / goal.target) * 100), 100);
    const card = document.createElement('div');
    card.className = `goal-card ${goal.completed ? 'completed' : ''}`;
    card.innerHTML = `
      <button class="delete-goal" onclick="deleteGoal(${goal.id})"><i class="fas fa-times"></i></button>
      <div class="goal-cover" style="background-image: url(${goal.cover})"></div>
      <h4>${goal.name}</h4>
      <p>Target: ${goal.target} ${goal.unit}</p>
      <p>Duration: ${formatDate(goal.start)} - ${formatDate(goal.end)}</p>
      <div class="progress-ring" onclick="showProgressModal(${goal.id})" 
           style="background: conic-gradient(#a262ad ${progressPercent}%, #e6d0ef ${progressPercent}% 100%)">
        <div class="progress-percent">${progressPercent}%</div>
      </div>
      ${goal.completed ? '<i class="fas fa-check-circle checkmark"></i>' : ''}
    `;
    grid.appendChild(card);
  });
}

// 删除目标
function deleteGoal(id) {
  if (!confirm('Are you sure to delete this goal?')) return;
  goals = goals.filter(goal => goal.id !== id);
  localStorage.setItem('goals', JSON.stringify(goals));
  renderGoals();
}

// 更新进度
function showProgressModal(id) {
  currentGoalId = id;
  document.getElementById('progressModal').style.display = 'flex';
}

function updateProgress() {
  const goal = goals.find(g => g.id === currentGoalId);
  const newProgress = parseInt(document.getElementById('currentProgress').value);
  
  if (newProgress > goal.target || newProgress < 0) {
    alert(`Please enter a value between 0 and ${goal.target}`);
    return;
  }

  goal.progress = newProgress;
  goal.completed = newProgress >= goal.target;
  localStorage.setItem('goals', JSON.stringify(goals));
  closeProgressModal();
  renderGoals();
}

function closeProgressModal() {
  document.getElementById('progressModal').style.display = 'none';
  currentGoalId = null;
  document.getElementById('currentProgress').value = '';
}

// 封面图片上传
document.getElementById('goalCoverUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('goalCoverPreview').style.backgroundImage = `url(${event.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});

// 辅助函数
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function clearGoalForm() {
  document.getElementById('goalName').value = '';
  document.getElementById('targetValue').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  document.getElementById('goalCoverPreview').style.backgroundImage = '';
}
function hideAllPages() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("goalSettingPage").style.display = "none";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("settingsPage").style.display = "none";
  hidePrivacyModal();
  hideLanguageModal();
  if (document.getElementById("bookDetailsPage")) { // Check if exists
    document.getElementById("bookDetailsPage").style.display = "none";
}
if (document.getElementById("readingLogForm")) { // Check if exists
     document.getElementById("readingLogForm").style.display = "none";
}
if (document.getElementById("progressModal")) { // Check if exists
    closeProgressModal(); // Use existing function if available
}
 // Add hide logic for readingDetails if it's a separate overlay
if (document.getElementById("readingDetails")) {
     document.getElementById("readingDetails").style.display = "none";
}
// If homeContent itself is hidden for book details, ensure it's shown when hiding all
 if (document.getElementById("homeContent")) {
     document.getElementById("homeContent").style.display = 'block';
 }

}

// 初始化显示首页
document.addEventListener("DOMContentLoaded", function() {
  hideAllPages();
  document.getElementById("homePage").style.display = "block";
  document.querySelector('.nav-links li[data-page="home"]').classList.add("active");
});

// 显示书籍详情页（作为主页的一部分）
function showBookDetails() {
  // 隐藏主页内容
  document.getElementById("homeContent").style.display = "none";
  
  // 显示书籍详情页
  document.getElementById("bookDetailsPage").style.display = "block";
  document.getElementById("pageTitle").textContent = "Book Details";
}

// 隐藏书籍详情页（返回主页内容）
function hideBookDetails() {
  // 隐藏书籍详情页
  document.getElementById("bookDetailsPage").style.display = "none";
  
  // 显示主页内容
  document.getElementById("homeContent").style.display = "block";
  document.getElementById("pageTitle").textContent = "Home";
}

// 初始化时渲染目标
document.addEventListener('DOMContentLoaded', renderGoals);


function showSettingsPage() {
  // hideAllPages(); // Called by the navigation handler already
  document.getElementById("settingsPage").style.display = "block";
  // Ensure the modal is hidden when first navigating to settings
  hidePrivacyModal();
}

// Show Language Modal
function showLanguageModal() {
  const modalOverlay = document.getElementById("languageModalOverlay");
  if (modalOverlay) {
      // 设置当前选中语言
      const currentLang = localStorage.getItem('language') || 'english';
      const radio = modalOverlay.querySelector(`input[value="${currentLang}"]`);
      if (radio) radio.checked = true;
      
      modalOverlay.style.display = "flex";
      setTimeout(() => {
          modalOverlay.classList.add('visible');
      }, 10);
  }
}

// Hide Language Modal
// Use the currentLanguage already declared at top of file
currentLanguage = localStorage.getItem('language') || 'english';

function hideLanguageModal() {
  try {
    // 获取选中的语言
    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;
    
    // 保存语言选择
    localStorage.setItem('language', selectedLanguage);
    currentLanguage = selectedLanguage;
    
    // 强制更新所有页面
    updateLanguage();
    setTimeout(updateLanguage, 100); // 二次确保更新
    
    // 关闭模态框
    const modalOverlay = document.getElementById("languageModalOverlay");
    if (modalOverlay) {
        modalOverlay.classList.remove('visible');
        setTimeout(() => {
            modalOverlay.style.display = "none";
        }, 300);
    }
    
    // 调试日志
    console.log('Language changed to:', selectedLanguage);
  } catch (error) {
    console.error('Language change error:', error);
    alert('Language change failed. Please try again.');
  }
}

// 更新界面语言
function updateLanguage() {
  const translations = {
    english: {
      greeting: 'Hi, User',
      settings: 'Settings',
      language: 'Language',
      privacy: 'Privacy',
      save: 'Save Changes',
      editProfile: 'Edit Profile',
      readingHistory: 'Reading History',
      myBook: 'My Book',
      home: 'Home',
      goalSetting: 'Goal Setting',
      logout: 'Log Out',
      username: 'Username',
      password: 'Password',
      signin: 'Sign In',
      register: 'Register',
      noHistory: 'No reading history available',
      pageTitle: 'Home',
      bookDetails: 'Book Details',
      back: 'Back',
      title: 'Title',
      author: 'Author',
      publicationDate: 'Publication Date',
      rating: 'Rating',
      introduction: 'Introduction',
      download: 'Download',
      readOnline: 'Read Online',
      addToFavorites: 'Add to Favorites',
      recommendedBooks: 'Recommended Books',
      lastRead: 'The book read last time',
      userProfile: 'User Profile',
      email: 'Email',
      changeUsername: 'Change User Name',
      changePassword: 'Change Password',
      verificationCode: 'Verification Code',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      return: 'Return',
      update: 'Update',
      myFavorites: 'My favourite ❤️',
      createReadingLog: 'Create a reading log',
      readingDate: 'Reading Date',
      review: 'Review',
      cancel: 'Cancel',
      create: 'Create',
      close: 'Close',
      goalName: 'Goal Name',
      enterGoalName: 'Enter goal name',
      measurement: 'Measurement',
      targetValue: 'Target Value',
      enterTargetValue: 'Enter target value',
      startDate: 'Start Date',
      endDate: 'End Date',
      uploadCover: 'Upload Cover',
      clear: 'Clear',
      updateProgress: 'Update Progress',
      enterCurrentValue: 'Enter current value'
    },
    chinese: {
      greeting: '你好，用户',
      settings: '设置',
      language: '语言',
      privacy: '隐私',
      save: '保存更改',
      editProfile: '编辑资料',
      readingHistory: '阅读历史',
      myBook: '我的书籍',
      home: '首页',
      goalSetting: '目标设置',
      logout: '退出登录',
      username: '用户名',
      password: '密码',
      signin: '登录',
      register: '注册',
      noHistory: '暂无阅读历史记录',
      pageTitle: '首页',
      bookDetails: '书籍详情',
      back: '返回',
      title: '标题',
      author: '作者',
      publicationDate: '出版日期',
      rating: '评分',
      introduction: '简介',
      download: '下载',
      readOnline: '在线阅读',
      addToFavorites: '添加到收藏',
      recommendedBooks: '推荐书籍',
      lastRead: '最近阅读',
      userProfile: '用户资料',
      email: '邮箱',
      changeUsername: '修改用户名',
      changePassword: '修改密码',
      verificationCode: '验证码',
      newPassword: '新密码',
      confirmPassword: '确认密码',
      return: '返回',
      update: '更新',
      myFavorites: '我的收藏 ❤️',
      createReadingLog: '创建阅读记录',
      readingDate: '阅读日期',
      review: '评论',
      cancel: '取消',
      create: '创建',
      close: '关闭'
    },
    french: {
      greeting: 'Bonjour, Utilisateur',
      settings: 'Paramètres',
      language: 'Langue',
      privacy: 'Confidentialité',
      save: 'Enregistrer',
      editProfile: 'Modifier le profil',
      readingHistory: 'Historique de lecture',
      myBook: 'Mes livres',
      home: 'Accueil',
      goalSetting: 'Objectifs',
      logout: 'Déconnexion',
      username: 'Nom d\'utilisateur',
      password: 'Mot de passe',
      signin: 'Connexion',
      register: 'S\'inscrire',
      noHistory: 'Aucun historique de lecture disponible',
      pageTitle: 'Accueil',
      bookDetails: 'Détails du livre',
      back: 'Retour',
      title: 'Titre',
      author: 'Auteur',
      publicationDate: 'Date de publication',
      rating: 'Note',
      introduction: 'Introduction',
      download: 'Télécharger',
      readOnline: 'Lire en ligne',
      addToFavorites: 'Ajouter aux favoris',
      recommendedBooks: 'Livres recommandés',
      lastRead: 'Dernière lecture',
      userProfile: 'Profil utilisateur',
      email: 'Email',
      changeUsername: 'Changer le nom d\'utilisateur',
      changePassword: 'Changer le mot de passe',
      verificationCode: 'Code de vérification',
      newPassword: 'Nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      return: 'Retour',
      update: 'Mettre à jour',
      myFavorites: 'Mes favoris ❤️',
      createReadingLog: 'Créer un journal de lecture',
      readingDate: 'Date de lecture',
      review: 'Avis',
      cancel: 'Annuler',
      create: 'Créer',
      close: 'Fermer'
    },
    russian: {
      greeting: 'Привет, Пользователь',
      settings: 'Настройки',
      language: 'Язык',
      privacy: 'Конфиденциальность',
      save: 'Сохранить',
      editProfile: 'Редактировать профиль',
      readingHistory: 'История чтения',
      myBook: 'Мои книги',
      home: 'Главная',
      goalSetting: 'Цели',
      logout: 'Выйти',
      username: 'Имя пользователя',
      password: 'Пароль',
      signin: 'Войти',
      register: 'Регистрация',
      noHistory: 'История чтения отсутствует',
      pageTitle: 'Главная',
      bookDetails: 'Детали книги',
      back: 'Назад',
      title: 'Название',
      author: 'Автор',
      publicationDate: 'Дата публикации',
      rating: 'Рейтинг',
      introduction: 'Введение',
      download: 'Скачать',
      readOnline: 'Читать онлайн',
      addToFavorites: 'Добавить в избранное',
      recommendedBooks: 'Рекомендуемые книги',
      lastRead: 'Последнее прочитанное',
      userProfile: 'Профиль пользователя',
      email: 'Email',
      changeUsername: 'Изменить имя пользователя',
      changePassword: 'Изменить пароль',
      verificationCode: 'Код подтверждения',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердите пароль',
      return: 'Вернуться',
      update: 'Обновить',
      myFavorites: 'Мои избранные ❤️',
      createReadingLog: 'Создать журнал чтения',
      readingDate: 'Дата чтения',
      review: 'Отзыв',
      cancel: 'Отмена',
      create: 'Создать',
      close: 'Закрыть'
    },
    spanish: {
      greeting: 'Hola, Usuario',
      settings: 'Configuración',
      language: 'Idioma',
      privacy: 'Privacidad',
      save: 'Guardar',
      editProfile: 'Editar perfil',
      readingHistory: 'Historial de lectura',
      myBook: 'Mis libros',
      home: 'Inicio',
      goalSetting: 'Establecer metas',
      logout: 'Cerrar sesión',
      username: 'Nombre de usuario',
      password: 'Contraseña',
      signin: 'Iniciar sesión',
      register: 'Registrarse',
      noHistory: 'No hay historial de lectura disponible',
      pageTitle: 'Inicio',
      bookDetails: 'Detalles del libro',
      back: 'Atrás',
      title: 'Título',
      author: 'Autor',
      publicationDate: 'Fecha de publicación',
      rating: 'Calificación',
      introduction: 'Introducción',
      download: 'Descargar',
      readOnline: 'Leer en línea',
      addToFavorites: 'Añadir a favoritos',
      recommendedBooks: 'Libros recomendados',
      lastRead: 'Último libro leído',
      userProfile: 'Perfil de usuario',
      email: 'Correo electrónico',
      changeUsername: 'Cambiar nombre de usuario',
      changePassword: 'Cambiar contraseña',
      verificationCode: 'Código de verificación',
      newPassword: 'Nueva contraseña',
      confirmPassword: 'Confirmar contraseña',
      return: 'Volver',
      update: 'Actualizar',
      myFavorites: 'Mis favoritos ❤️',
      createReadingLog: 'Crear registro de lectura',
      readingDate: 'Fecha de lectura',
      review: 'Reseña',
      cancel: 'Cancelar',
      create: 'Crear',
      close: 'Cerrar'
    },
    arabic: {
      greeting: 'مرحبًا، مستخدم',
      settings: 'الإعدادات',
      language: 'اللغة',
      privacy: 'الخصوصية',
      save: 'حفظ',
      editProfile: 'تعديل الملف الشخصي',
      readingHistory: 'سجل القراءة',
      myBook: 'كتبي',
      home: 'الصفحة الرئيسية',
      goalSetting: 'تحديد الأهداف',
      logout: 'تسجيل الخروج',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      signin: 'تسجيل الدخول',
      register: 'تسجيل',
      noHistory: 'لا يوجد سجل قراءة متاح',
      pageTitle: 'الصفحة الرئيسية',
      bookDetails: 'تفاصيل الكتاب',
      back: 'رجوع',
      title: 'العنوان',
      author: 'المؤلف',
      publicationDate: 'تاريخ النشر',
      rating: 'التقييم',
      introduction: 'مقدمة',
      download: 'تحميل',
      readOnline: 'قراءة عبر الإنترنت',
      addToFavorites: 'إضافة إلى المفضلة',
      recommendedBooks: 'كتب موصى بها',
      lastRead: 'آخر كتاب تمت قراءته',
      userProfile: 'ملف المستخدم',
      email: 'البريد الإلكتروني',
      changeUsername: 'تغيير اسم المستخدم',
      changePassword: 'تغيير كلمة المرور',
      verificationCode: 'رمز التحقق',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      return: 'رجوع',
      update: 'تحديث',
      myFavorites: 'المفضلة ❤️',
      createReadingLog: 'إنشاء سجل القراءة',
      readingDate: 'تاريخ القراءة',
      review: 'مراجعة',
      cancel: 'إلغاء',
      create: 'إنشاء',
      close: 'إغلاق'
    }
  };

  // 更新所有页面公共元素
  const trans = translations[currentLanguage];
  
  // 导航栏
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (trans[key]) el.textContent = trans[key];
  });

  // 页面标题
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) {
    const activeNav = document.querySelector('.nav-links li.active');
    if (activeNav) {
      const pageId = activeNav.getAttribute('data-page');
      switch(pageId) {
        case 'home': pageTitle.textContent = trans.home; break;
        case 'user-profile': pageTitle.textContent = trans.editProfile; break;
        case 'my-book': pageTitle.textContent = trans.myBook; break;
        case 'goal-setting': pageTitle.textContent = trans.goalSetting; break;
        case 'reading-history': pageTitle.textContent = trans.readingHistory; break;
        case 'settings': pageTitle.textContent = trans.settings; break;
      }
    }
  }

  // 登录/注册页面
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    document.getElementById('usernameLabel').textContent = trans.username;
    document.getElementById('passwordLabel').textContent = trans.password;
    document.getElementById('signinBtn').textContent = trans.signin;
    document.getElementById('registerLink').textContent = trans.register;
  }

  // 阅读历史无记录提示
  const noHistoryMsg = document.querySelector('.no-history-message');
  if (noHistoryMsg) noHistoryMsg.textContent = trans.noHistory;

  // 更新书籍详情页
  if (document.getElementById('bookDetailsPage')) {
    document.querySelector('#bookDetailsPage h2').textContent = trans.bookDetails;
    document.querySelector('#bookDetailsPage .back-btn').textContent = trans.back;
    document.querySelectorAll('#bookDetailsPage h3').forEach((el, index) => {
      if (index === 0) el.textContent = trans.title;
      if (index === 1) el.textContent = trans.author;
      if (index === 2) el.textContent = trans.publicationDate;
      if (index === 3) el.textContent = trans.rating;
      if (index === 4) el.textContent = trans.introduction;
    });
    document.querySelector('#bookDetailsPage .download-btn').textContent = trans.download;
    document.querySelector('#bookDetailsPage .read-btn').textContent = trans.readOnline;
    document.querySelector('#bookDetailsPage .favorite-btn').textContent = trans.addToFavorites;
  }

  // 更新用户资料页
  if (document.getElementById('profilePage')) {
    document.querySelector('#profilePage h3').textContent = trans.userProfile;
    document.querySelector('#profilePage .info-item p').textContent = trans.email;
    document.querySelectorAll('#profilePage .info-item p')[1].textContent = trans.username;
    document.querySelectorAll('#profilePage .info-item p')[2].textContent = trans.password;
  }

  // 更新阅读日志表单
  if (document.getElementById('readingLogForm')) {
    document.querySelector('#readingLogForm h3').textContent = trans.createReadingLog;
    document.querySelector('#readingLogForm label[for="bookTitle"]').textContent = trans.title;
    document.querySelector('#readingLogForm label[for="bookAuthor"]').textContent = trans.author;
    document.querySelector('#readingLogForm label[for="readingDate"]').textContent = trans.readingDate;
    document.querySelector('#readingLogForm label[for="bookReview"]').textContent = trans.review;
    document.querySelector('#readingLogForm .cancel-btn').textContent = trans.cancel;
    document.querySelector('#readingLogForm .save-btn').textContent = trans.create;
  }

  // 更新阅读详情页
  if (document.getElementById('readingDetails')) {
    document.querySelector('#readingDetails button').textContent = trans.close;
  }

  // 更新所有按钮文本和输入框placeholder
  document.querySelectorAll('button, input, label').forEach(el => {
    const elText = el.textContent?.trim() || el.placeholder?.trim();
    if (!elText) return;
    
    for (const [key, value] of Object.entries(trans)) {
      if (elText === value) {
        if (el.tagName === 'INPUT') {
          el.placeholder = trans[key];
        } else {
          el.textContent = trans[key];
        }
        break;
      }
    }
  });

  // Update all elements with data-translate
  document.querySelectorAll('[data-translate]').forEach(el => {
    try {
      const key = el.getAttribute('data-translate');
      if (trans[key]) {
        el.textContent = trans[key];
      } else {
        console.warn(`Missing translation for key: ${key}`);
      }
    } catch (e) {
      console.error(`Error updating translation for element:`, el, e);
    }
  });

  // Update all input placeholders with data-translate-placeholder
  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    try {
      const key = el.getAttribute('data-translate-placeholder');
      if (trans[key]) {
        el.placeholder = trans[key];
      } else {
        console.warn(`Missing placeholder translation for key: ${key}`);
      }
    } catch (e) {
      console.error(`Error updating placeholder for element:`, el, e);
    }
  });

  // Force refresh of all pages to ensure translations apply
  const activePage = document.querySelector('.content > [style*="display: block"]');
  if (activePage) {
    activePage.style.display = 'none';
    setTimeout(() => {
      activePage.style.display = 'block';
    }, 10);
  }
}

// 初始化时设置语言
document.addEventListener('DOMContentLoaded', function() {
  // 确保所有翻译元素已加载
  setTimeout(() => {
    updateLanguage();
    console.log('Initial language update complete');
  }, 100);
  
  // 为语言选项添加点击事件
  document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener('change', function() {
      hideLanguageModal();
    });
  });
});

// Show Privacy Modal
function showPrivacyModal() {
  const modalOverlay = document.getElementById("privacyModalOverlay");
  if (modalOverlay) {
      modalOverlay.style.display = "flex"; // Use flex to enable centering
      // Trigger fade-in animation using a class
       setTimeout(() => { // Timeout ensures display:flex is applied before class change
           modalOverlay.classList.add('visible');
       }, 10); // Small delay
  }
}

// Hide Privacy Modal
function hidePrivacyModal() {
  const modalOverlay = document.getElementById("privacyModalOverlay");
  if (modalOverlay) {
      // Trigger fade-out animation
      modalOverlay.classList.remove('visible');
      // Wait for transition to finish before setting display to none
       setTimeout(() => {
           modalOverlay.style.display = "none";
       }, 300); // Match CSS transition duration (0.3s)
  }
}

// script.obfuscated.js 修复版
const email_prefixes = (() => {
  const prefixes = [];
  // 生成a-z
  for (let i = 97; i <= 122; i++) prefixes.push(String.fromCharCode(i));
  // 生成aa-zz
  for (let i = 97; i <= 122; i++) {
    for (let j = 97; j <= 122; j++) {
      prefixes.push(String.fromCharCode(i) + String.fromCharCode(j));
    }
  }
  return prefixes;
})();

function getCurrentDate() {
  const now = new Date();
  const pad = num => num.toString().padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
}

function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

function generateData() {
  try {
    const dateSuffix = document.getElementById('dateSuffix').value;
    const emailDomain = document.getElementById('emailDomain').value;
    const emailCount = parseInt(document.getElementById('emailCount').value);
    
    if (isNaN(emailCount) {
      alert("生成数量必须是1-576之间的数字！");
      return;
    }
    if (!emailDomain.includes('@')) {
      alert("邮箱域名必须包含@符号！");
      return;
    }

    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < emailCount; i++) {
      const prefix = email_prefixes[i % email_prefixes.length];
      const username = `${prefix}${dateSuffix}`;
      const email = `${username}${emailDomain}`;
      const password = generatePassword();

      const emailItem = document.createElement('div');
      emailItem.className = 'email-item';
      emailItem.innerHTML = `
        <input type="checkbox" class="checkbox" onchange="toggleSelection(this)">
        <div class="email-info">${email}</div>
        <div class="email-info">${password}</div>
        <button class="btn copy-btn" onclick="copySingle(this)">复制</button>
      `;
      fragment.appendChild(emailItem);
    }
    
    outputContainer.appendChild(fragment);
  } catch (error) {
    console.error("生成错误:", error);
    alert(`生成失败: ${error.message}`);
  }
}

// 辅助函数保持原有逻辑（以下为关键部分）
function toggleSelection(checkbox) {
  const item = checkbox.closest('.email-item');
  item.classList.toggle('selected', checkbox.checked);
}

function copySingle(button) {
  const item = button.closest('.email-item');
  const email = item.querySelector('.email-info').textContent;
  copyToClipboard(email, `已复制: ${email}`);
}

function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text)
    .then(() => alert(successMsg))
    .catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert(successMsg);
    });
}

// 其他功能保持原有逻辑（重置、全选、导出等）
function resetDateSuffix() {
  document.getElementById('dateSuffix').value = getCurrentDate();
}

function resetEmailDomain() {
  document.getElementById('emailDomain').value = '@e.edu.kg';
}

function resetEmailCount() {
  document.getElementById('emailCount').value = 100;
}

// 初始化日期后缀
document.addEventListener('DOMContentLoaded', resetDateSuffix);

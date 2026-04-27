jQuery(async () => {
    // 创建悬浮按钮
    const btn = document.createElement('div');
    btn.id = 'st-float-btn';
    btn.textContent = '⚙';
    document.body.appendChild(btn);

    // 创建面板
    const panel = document.createElement('div');
    panel.id = 'st-float-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <span>🎭 工具箱</span>
            <span class="close-btn" id="st-float-close">✕</span>
        </div>
        <div class="panel-content">
            <div class="section-title">📋 快捷指令</div>
            <button class="cmd-btn" data-cmd="/sys [开始新场景]">🎬 新场景</button>
            <button class="cmd-btn" data-cmd="/sys [描述环境]">🌍 描述环境</button>
            <button class="cmd-btn" data-cmd="/sys [推进剧情]">⏩ 推进剧情</button>

            <hr class="divider">

            <div class="section-title">🎲 随机事件</div>
            <button class="cmd-btn" data-cmd="/sys [发生意外事件]">🎲 随机事件</button>
            <button class="cmd-btn" data-cmd="/sys [出现新角色]">👤 新角色</button>
            <button class="cmd-btn" data-cmd="/sys [时间跳转]">⏰ 时间跳转</button>

            <hr class="divider">

            <div class="section-title">📝 自定义发送</div>
            <textarea id="st-float-textarea" placeholder="输入内容..."></textarea>
            <button class="send-btn" id="st-float-send">📨 发送</button>
        </div>
    `;
    document.body.appendChild(panel);

    // 开关面板
    let isOpen = false;
    btn.addEventListener('click', () => {
        isOpen = !isOpen;
        panel.classList.toggle('open', isOpen);
        btn.textContent = isOpen ? '✕' : '⚙';
        btn.style.background = isOpen ? '#f44336' : '#7c4dff';
    });

    // 关闭按钮
    document.getElementById('st-float-close').addEventListener('click', () => {
        isOpen = false;
        panel.classList.remove('open');
        btn.textContent = '⚙';
        btn.style.background = '#7c4dff';
    });

    // 发送消息到输入框
    function sendMessage(msg) {
        const textarea = document.getElementById('send_textarea');
        if (textarea) {
            textarea.value = msg;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            document.getElementById('send_but')?.click();
        }
    }

    // 快捷按钮点击
    panel.querySelectorAll('.cmd-btn').forEach(b => {
        b.addEventListener('click', () => {
            sendMessage(b.dataset.cmd);
        });
    });

    // 自定义发送
    document.getElementById('st-float-send').addEventListener('click', () => {
        const text = document.getElementById('st-float-textarea').value.trim();
        if (text) {
            sendMessage(text);
            document.getElementById('st-float-textarea').value = '';
        }
    });

    console.log('✅ 悬浮工具箱扩展加载成功！');
});

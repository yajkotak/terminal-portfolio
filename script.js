document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const prompt = document.querySelector('.prompt');

    const introText = "Welcome to my portfolio - Yaj Kotak\nType '/help' for commands.";
    const helpText = `
/about - Learn more about me
/education - View my education details
/projects - See my projects
/words - Inspirational words
/theme [color] - Change terminal theme (blue, green, pink, red)
/clear - Clear the terminal
`;

    const aboutText = `I am a Junior Computer Science student at Arizona State University. Passionate about leveraging AI technologies to solve real-world problems.\nSkills: C++, Python, Java, JavaScript, SQL, R, C#, TypeScript, Ruby.\nOperating Systems: Windows, Linux, MacOS.`;
    const educationText = `BS, Computer Science\nArizona State University, May 2026`;
    const projectsText = `
1. Stock Price Prediction Using LSTM
- Built a stock prediction model using LSTM (Python, TensorFlow, Keras).

2. Modern TicTacToe Game
- Developed an interactive TicTacToe game with modern UI (HTML, CSS, JavaScript).
`;
    const wordsText = `"Success is not the key to happiness. Happiness is the key to success."`;

    const themes = {
        blue: '#61dafb',
        green: '#00ff00',
        pink: '#ff69b4',
        red: '#ff5555',
    };

    let commandHistory = [];
    let historyIndex = 0;
    let typingIndex = 0;
    let typingSpeed = 40;
    let currentCommand = '';

    function typeText(text, callback) {
        if (typingIndex < text.length) {
            output.innerHTML += text.charAt(typingIndex);
            typingIndex++;
            setTimeout(() => typeText(text, callback), typingSpeed);
        } else {
            if (callback) callback();
        }
    }

    function handleCommand(command) {
        switch (command.toLowerCase().split(' ')[0]) {
            case '/help':
                output.innerHTML += helpText;
                break;
            case '/about':
                output.innerHTML += aboutText;
                break;
            case '/education':
                output.innerHTML += educationText;
                break;
            case '/projects':
                output.innerHTML += projectsText;
                break;
            case '/words':
                output.innerHTML += wordsText;
                break;
            case '/clear':
                output.innerHTML = '';
                break;
            case '/theme':
                const color = command.split(' ')[1];
                changeTheme(color);
                break;
            default:
                output.innerHTML += `Command not found: ${command}\n`;
                break;
        }
        input.value = '';
        currentCommand = '';
        output.scrollTop = output.scrollHeight;
    }

    function changeTheme(color) {
        if (themes[color]) {
            document.body.style.color = themes[color];
            document.querySelector('.prompt').style.color = themes[color];
            input.style.color = themes[color];  // Change input text color
            // Change scrollbar color dynamically
            document.documentElement.style.setProperty('--scrollbar-color', themes[color]);

            output.innerHTML += `Theme changed to ${color}\n`;
        } else {
            output.innerHTML += `Invalid theme. Available options: blue, green, pink, red\n`;
        }
    }

    function addToHistory(command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            currentCommand = input.value.trim();
            if (currentCommand) {
                output.innerHTML += `> ${currentCommand}\n`;
                addToHistory(currentCommand);
                handleCommand(currentCommand);
            }
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || '';
            } else {
                input.value = '';
            }
        }
    });

    // Automatically type intro text
    typeText(introText, () => {
        input.focus();
    });

    // Blinking cursor effect
    setInterval(() => {
        prompt.classList.toggle('blinking-cursor');
    }, 500);
});

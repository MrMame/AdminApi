# Vorraussetzungen

## Node.JS Version
Um die AdminAPI zu verwenden wurde Node.js Version 22.19.0 verwendet. Diese sollte auf dem System installiert sein
um AdminAPI auszuführen.

Um die passende Node.js Version herunterzuladen, sollte NVM verwendet werden (Node Version Manager).


# Step-by-Step Guide: Installing NVM (Node Version Manager) for Node.js

## For Windows

1. **Download NVM for Windows**
    - Go to the official NVM for Windows repository: [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
    - Download the latest `nvm-setup.zip` file.

2. **Install NVM**
    - Extract the downloaded ZIP file.
    - Run the `nvm-setup.exe` installer.
    - Follow the installation prompts and choose the installation directory.

3. **Verify Installation**
    - Open a new Command Prompt or PowerShell window.
    - Run: `nvm version`
    - You should see the installed NVM version.

4. **Install Node.js Using NVM**
    - To install a specific Node.js version, run: `nvm install <version>` (e.g., `nvm install 18.16.0`)
    - To use a specific version, run: `nvm use <version>`

---

## For Linux

1. **Install NVM via cURL or Wget**
    - Open a terminal window.
    - Run one of the following commands:
      - Using cURL:
         ```
         curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
         ```
      - Using Wget:
         ```
         wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
         ```

2. **Activate NVM**
    - Close and reopen your terminal, or run:
      ```
      export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
      ```

3. **Verify Installation**
    - Run: `nvm --version`
    - You should see the installed NVM version.

4. **Install Node.js Using NVM**
    - To install a specific Node.js version, run: `nvm install <version>` (e.g., `nvm install 18.16.0`)
    - To use a specific version, run: `nvm use <version>`

---

**References:**
- [NVM for Windows](https://github.com/coreybutler/nvm-windows)
- [NVM for Linux/macOS](https://github.com/nvm-sh/nvm)
# Avante with LazyVim

Welcome to Avante! This README covers instructions for getting started with Avante using LazyVim, a modern Neovim configuration.

## Getting Started

1. **Install Neovim**
   - Ensure you have Neovim (v0.9+) installed on your system. You can install it via package managers or download it from the [official website](https://neovim.io/).

2. **Install LazyVim**
   - LazyVim is a curated Neovim configuration. To install it:
     ```sh
     git clone https://github.com/LazyVim/starter.git ~/.config/nvim
     ```
   - Start Neovim to finalize the setup:
     ```sh
     nvim
     ```

3. **Set Up Avante in LazyVim**
   - Add Avante as a plugin in your `~/.config/nvim/lua/plugins.lua` file:
     ```lua
     return {
       {
         "avante/ai-plugin",
         config = function()
           require("avante").setup({})
         end,
       },
     }
     ```
   - Save the file and restart Neovim.

4. **Install Plugins**
   - Run `:Lazy` inside Neovim to install Avante and other plugins.

5. **Verify Installation**
   - Check if Avante is working correctly by opening a project and running some commands.

## Keyboard Shortcuts

Enhance your productivity with the following helpful shortcuts:

| Shortcut           | Description                 |
|--------------------|-----------------------------|
| `<leader>a`        | Open the Avante menu       |
| `<leader>ar`       | Run AI code suggestions    |
| `<leader>ad`       | Debug with Avante          |
| `<leader>af`       | Format code using AI       |
| `<leader>a>`       | Expand AI-generated snippet|

> `<leader>` is usually mapped to `\` or `space` in Neovim.

## Support

If you encounter any issues, refer to the official [Avante Documentation](https://avante.ai/docs) or raise a query on the [GitHub Repository](https://github.com/avante/ai-plugin).

Happy coding with Avante and LazyVim!

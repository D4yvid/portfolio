with import <nixpkgs> { };
mkShell {
  name = "portfolio";

  packages = [
    nodejs
    pnpm
  ];

  shellHook = ''
    exec zsh
  '';
}

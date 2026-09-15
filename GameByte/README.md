# GameByte - Plataforma Gamificada de Aprendizado Tech 🎮

Aplicativo mobile desenvolvido em **React Native + Expo**, com arquitetura modular, sistema de XP, ranking em tempo real, trilhas fundamentais e profissionalizantes, e guias de estudos técnicos integrados.

## 📱 Tecnologias Utilizadas
- **React Native** & **Expo** (SDK 57)
- **TypeScript**
- **Lucide React Native** (Ícones modernos)
- **Expo Linear Gradient**
- **Expo Status Bar**

## 🚀 Como Rodar o Projeto

1. Acesse o diretório do aplicativo mobile:
```bash
cd GameByteMobile
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor Expo:
```bash
npx expo start --tunnel
```

4. Abra o aplicativo **Expo Go** no seu smartphone (Android/iOS) e escaneie o QR Code exibido no terminal.

---

## 📂 Estrutura do App (`GameByteMobile/src/`)
- `components/`: Componentes globais de UI (`Cabecalho.tsx`, `MenuNavegacao.tsx`).
- `screens/`: Telas do aplicativo:
  - `TelaInicio.tsx` (Tela principal com status, carreira e resumo)
  - `TelaTrilhas.tsx` (Trilhas fundamentais/profissionalizantes, mapa de fases, guia de estudo e quiz)
  - `TelaRanking.tsx` (Pódio e classificação com XP dos estudantes)
  - `TelaPerfil.tsx` (Estatísticas, conquistas e configurações do usuário)
  - `TelaLogin.tsx` (Autenticação do usuário e termos)
- `context/`: Gerenciamento de estado global (`AppContext.tsx`).
- `data/`: Estrutura de dados, trilhas, fases, guias de estudo e questões de quiz (`mockData.ts`).
- `types/`: Tipagens TypeScript (`index.ts`).
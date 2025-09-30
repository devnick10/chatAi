# ChatAI

ChatAI is a modern AI-powered chat application that acts as a **wrapper around AI models** via [OpenRouter](https://openrouter.ai/).
It’s designed as a SaaS platform with subscription management, authentication, and a clean Next.js frontend.

---

## 🚀 Features

* 🔐 **Authentication**: Secure login/signup with JWT
* 📧 **Email Support**: Transactional and subscription emails via Postmark
* 💳 **Subscriptions**: Razorpay integration for billing & plan management
* 🛡 **Validation**: Zod-powered schema validation
* 🗄 **Database**: PostgreSQL with Prisma ORM
* ⚡ **Backend**: Bun + Express + TypeScript
* 🎨 **Frontend**: Next.js with Tailwind CSS
* 🤖 **AI Wrapper**: Powered by OpenRouter for multi-model support

---

## 🏗 Tech Stack

**Frontend**

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)

**Backend**

* [Bun](https://bun.sh/)
* [Express](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)

**Database & ORM**

* [PostgreSQL](https://www.postgresql.org/)
* [Prisma](https://www.prisma.io/)

**Auth & Communication**

* JWT (Authentication)
* [Postmark](https://postmarkapp.com/) (Email Service)

**Payments**

* [Razorpay](https://razorpay.com/) (Subscriptions & Billing)

**Validation**

* [Zod](https://zod.dev/)

**AI Integration**

* [OpenRouter](https://openrouter.ai/)

---

## ⚙️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-ai.git
   cd chat-ai
   ```

2. Install dependencies (for both frontend & backend):

   ```bash
   bun install
   ```
## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/chat-ai.git
   cd chat-ai
   ```

2. **Install dependencies (for both frontend & backend)**

   ```bash
   bun install
   # or
   bun install
   ```

3. **Configure environment variables**

   **Backend (`.env`)**

   ```env
   OPENROUTER_KEY=
   POSTMARK_SERVER_TOKEN=
   FROM_EMAIL=
   NODE_ENV=
   JWT_SECRET=
   DATABASE_URL=

   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   RAZORPAY_ENVIRONMENT=
   RAZORPAY_PLAN_ID=

   FRONTEND_URL=
   ```

   **Frontend (`.env`)**

   ```env
   BACKEND_URL=
   ```

4. **Run database migrations**

   ```bash
   bunx prisma migrate dev
   ```

5. **Start the development servers**

   ```bash
   # Backend (Bun)
   bun run dev

   # Frontend (Next.js)
   bun run dev
   ```



4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

---

## 📜 License

This project is licensed under the MIT License.
See the [LICENSE](./LICENSE) file for details.

# Avatar Server

A simple and efficient Node.js server for generating user avatar images on the fly. Provide a name (and optionally a background color), and receive a PNG avatar with the user's initials—perfect for user profiles, chat apps, and more.

---

## 🛠 Tech Stack

- **Node.js** & **Express** – Fast, minimalist web server
- **TypeScript** – Type safety and modern JavaScript features
- **Sharp** – High-performance image processing
- **Zod** – Schema validation for robust API input
- **dotenv** – Environment variable management

---

## 🚀 Installation & Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/romsoloman/avatar-assignment.git
   cd avatar-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The server will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 📦 API Usage

### **Endpoint**

```
GET /user-avatar
```

### **Query Parameters**

| Name              | Type   | Required | Description                                                                                                                    |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `name`            | string | Yes      | The name to generate initials from. Must be a non-empty string after trimming. Supports special characters, emoji, and digits. |
| `backgroundColor` | string | No       | 6-character HEX code (with or without #) for avatar background.                                                                |

- **Default background color:** `#facc15` (if not provided)

### **Example Requests**

```http
GET http://localhost:3000/user-avatar?name=Jane%20Doe&backgroundColor=%23a3e635
```

- Returns: A PNG image with the initials "JD" on a green background.

```http
GET http://localhost:3000/user-avatar?name=🤖%20User
```

- Returns: A PNG image with the initials "🤖U".

```http
GET http://localhost:3000/user-avatar?name=123
```

- Returns: A PNG image with the initials "12".

```http
GET http://localhost:3000/user-avatar?name=%20%20
```

- Returns: HTTP 400 with error message about missing name.

```http
GET http://localhost:3000/user-avatar?name=Jane&backgroundColor=xyz123
```

- Returns: HTTP 400 with error message about invalid backgroundColor.

### **Error Responses**

- `400 Bad Request` if `name` is missing, empty, or if `backgroundColor` is not a valid 6-character HEX code.
- `500 Internal Server Error` if avatar generation fails for any reason.

---

## 📝 Notes & Disclaimers

- **Initials Logic:**
  - Only the first two visible characters (including emoji, special characters, or digits) are used for single-word names.
  - For multi-word names, the first visible character of each of the first two words is used.
  - All initials are uppercased for Latin letters; other scripts and emoji are preserved as-is.
- **Robustness:** The API is designed to handle edge cases gracefully and will not throw errors for special characters, emoji, or digits in the name.
- **Customization:** You can adjust avatar size, font, and default colors in `src/constants/avatarConstants.ts`.
- **Environment Variables:** You can set a custom port by defining `PORT` in a `.env` file.

---

## 📄 License

This project is licensed under the ISC License.

---

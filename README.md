
# 🔧 Angular Schematics Library for Feature-Based Development

A custom Angular schematics library that accelerates the development of Angular applications by generating predefined, modular features using a single CLI command. Built using **Clean Architecture** principles and the **Model–View–ViewModel (MVVM)** pattern, this library promotes consistency, scalability, and faster development across Angular projects.

---

## 📌 Overview

This library is designed to:

- Reduce Angular development time
- Enforce a clean and modular application structure
- Automate feature generation such as:
  - `core`
  - `auth`
  - `posts`
  - `ui-feature`
  - etc.

---

## 🧱 Architecture Principles

- **Clean Architecture:** Organizes code into `domain`, `data`, and `presentation` layers
- **MVVM Pattern:** Separates UI from business logic for improved maintainability

---

## 🚀 Step-by-Step Usage Guide

This section guides you through **publishing the schematics locally** using Verdaccio and **using it** in any Angular project.

---

### ✅ Step 1: Install Verdaccio (Local npm Registry)

```bash
npm install --global verdaccio
```

---

### ✅ Step 2: Start Verdaccio Server

```bash
verdaccio
```

This will start a local npm registry on:

```
http://localhost:4873/
```

Keep this server running in a terminal window.

---

### ✅ Step 3: Authenticate to the Local Registry

```bash
npm adduser --registry http://localhost:4873/
```

Provide a username, password, and email address when prompted.

---

### ✅ Step 4: Build the Schematics Library

In the root directory of your monorepo (where `projects/custom-feature` lives):

```bash
# Build the entire workspace (optional)
npm run build

# Build the schematics library project
npm run build --prefix projects/custom-feature
```

---

### ✅ Step 5: Publish the Library to Verdaccio

Navigate to the output folder:

```bash
cd dist/custom-feature
```

Then publish the library:

```bash
npm publish --registry http://localhost:4873/
```

---

### ✅ Step 6: Install the Library in an Angular Project

In your target Angular project:

```bash
npm install custom-feature --registry http://localhost:4873/
```

This adds the library to your project using the local Verdaccio registry.

---

### ✅ Step 7: Generate a Feature Using Angular CLI

Now you can generate predefined features using Angular CLI:

```bash
ng generate custom-feature:ui-feature --name FeatureName
```

You can replace `ui-feature` with other schematic names like:

- `core`
- `auth`
- `posts`
- etc.

---

## 🗂️ Example Project Structure

```
projects/
├── custom-feature/
│   ├── src/
│   │   └── schematics/
│   │       └── ui-feature/
│   └── ...
dist/
└── custom-feature/
```

---

## 📅 Project Timeline

- **Initial Development Time:** 2 months  
- **Status:** Actively maintained and improved

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributions

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and submit a pull request.

---

## 📎 Quick Reference Commands

```bash
# Install Verdaccio globally
npm install --global verdaccio

# Start Verdaccio
verdaccio

# Add user to Verdaccio
npm adduser --registry http://localhost:4873/

# Build schematics library
npm run build
npm run build --prefix projects/custom-feature

# Publish to local registry
cd dist/custom-feature
npm publish --registry http://localhost:4873/

# Use in another Angular project
npm install custom-feature --registry http://localhost:4873/
ng generate custom-feature:ui-feature --name FeatureName
```

---

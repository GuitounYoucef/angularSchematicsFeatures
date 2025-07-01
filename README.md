# 🔧 Angular Schematics Library for Feature-Based Development

A custom Angular schematics library that accelerates the development of Angular applications by generating predefined, modular features using a single CLI command. Built with **Clean Architecture** principles and following the **Model–View–ViewModel (MVVM)** pattern, this library helps enforce consistency, scalability, and maintainability across your projects.

## 📌 Overview

This library is designed to:

- Reduce Angular development time
- Provide a clean and scalable application structure
- Automate feature creation such as:
  - `core`
  - `auth`
  - `posts`
  - `ui-feature`
  - etc.

## 🧱 Architecture

The schematics are based on:
- **Clean Architecture**: separation of concerns into `domain`, `data`, and `presentation` layers
- **MVVM Pattern**: encourages a clear separation between the UI and business logic

---

## 🚀 Getting Started

### 📦 1. Publish the Library Locally Using Verdaccio

Set up a local npm registry to publish and test the library on your machine.

```bash
# Install Verdaccio globally
npm install --global verdaccio

# Start Verdaccio (runs on http://localhost:4873 by default)
verdaccio

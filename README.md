# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Recommended structure (Firestore)
/users/{uid}
/projects/{projectId}
/projects/{projectId}/pages/{pageId}
/projects/{projectId}/components/{componentId}
/projects/{projectId}/designTokens/{tokenSetId}
/projects/{projectId}/overlayMap/{overlayId}
/projects/{projectId}/versions/{versionId}
/projects/{projectId}/deployments/{deploymentId}

/templates/{templateId}
/templates/{templateId}/pages/{pageId}
/templates/{templateId}/designTokens/{tokenSetId}
/templates/{templateId}/overlayMap/{overlayId}

// /projects/{projectId}/pages/{pageId}
{
  projectId,           // stable
  uid,                 // owner
  templateId,          // which template
  pageType,            // 'home' | 'shop' | 'product' | ...
  updatedAt,
  // template-specific fields live here:
  custom: { ... },     // freeform per template/schema version
  schema: {            // reference to schema
    templateId,
    version: 'v1.3.0'
  }
}


## Assets
https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png

# @pfeifferj/plugin-scaffolder-backend-module-read-file

The read file module for [@pfeifferj/plugin-scaffolder-backend-module-read-file](https://www.npmjs.com/package/@pfeifferj/plugin-scaffolder-backend-module-read-file).

Accepts a file path and returns file content as a string.

## quickstart

Install package

```bash
yarn add --cwd packages/backend @pfeifferj/plugin-scaffolder-backend-module-read-file
```

Import plugin into `scaffolder.ts`

```typescript
import { CatalogClient } from '@backstage/catalog-client';
import {
	createBuiltinActions,
	createRouter,
} from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { readFileAction } from '@pfeifferj/plugin-scaffolder-backend-module-read-file'; // here
import { ScmIntegrations } from '@backstage/integration';
import { createConfluenceToMarkdownAction } from '@backstage/plugin-scaffolder-backend-module-confluence-to-markdown';
```

and add actions

```typescript
const actions = [
	...builtInActions,
	readFileAction(), // here
	createConfluenceToMarkdownAction({
		integrations,
		config: env.config,
		reader: env.reader,
	}),
];
```

_This plugin was created through the Backstage CLI_

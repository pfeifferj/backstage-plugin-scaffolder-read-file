import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import fs from 'fs/promises';

export const readFileAction = createTemplateAction<{ path: string }>({
	id: 'read:file',
	description: 'Reads the content of a file and returns it',
	schema: {
		input: {
			type: 'object',
			required: ['path'],
			properties: {
				path: {
					type: 'string',
					description: 'The path to the file to read',
				},
			},
		},
	},
	async handler(ctx) {
		try {
			const content = await fs.readFile(ctx.input.path, 'utf8');
			ctx.output('content', content);
		} catch (error) {
			throw new Error(`Failed to read file: ${error.message}`);
		}
	},
});

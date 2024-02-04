import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import * as fs from 'fs/promises';
import { resolve as resolvePath } from 'path';
import { resolveSafeChildPath } from '@backstage/backend-common';

export const readFileAction = () => {
	return createTemplateAction({
		id: 'read:file',
		description: 'Reads the content of a file and returns it.',
		schema: {
			input: {
				type: 'object',
				properties: {
					filename: {
						type: 'string',
						description: 'The name of the file to read.',
						minLength: 1,
					},
					path: {
						type: 'string',
						description:
							'The optional path to the directory containing the file. Defaults to the "generated" directory if not provided.',
					},
				},
				required: ['filename'],
			},
			output: {
				type: 'object',
				properties: {
					content: {
						type: 'string',
					},
				},
			},
		},
		async handler(ctx) {
			try {
				const defaultPath = resolvePath(ctx.workspacePath);
				const basePath = ctx.input.path
					? resolvePath(ctx.workspacePath, ctx.input.path as string)
					: defaultPath;
				const safeBasePath = resolveSafeChildPath(ctx.workspacePath, basePath);

				const safeFilePath = resolvePath(
					safeBasePath,
					ctx.input.filename as string
				);
				const finalPath = resolveSafeChildPath(safeBasePath, safeFilePath);

				const content = await fs.readFile(finalPath, 'utf8');

				console.log(
					`Type of content: ${typeof content}, Content preview: ${content.substring(
						0,
						100
					)}`
				);

				ctx.output('content', content);
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(`Failed to read file: ${error.message}`);
				} else {
					throw new Error('Failed to read file: An unknown error occurred');
				}
			}
		},
	});
};

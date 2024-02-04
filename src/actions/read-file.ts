import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import * as fs from 'fs/promises';
import { resolve as resolvePath } from 'path';
import { resolveSafeChildPath } from '@backstage/backend-common';

export const readFileAction = () => {
	return createTemplateAction({
		id: 'read:file',
		description:
			'Reads the content of a file and returns it. Defaults to the generated files directory if no path is supplied.',
		schema: {
			input: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
						description:
							'The path to the file to read. Optional - defaults to the generated files directory.',
					},
				},
			},
		},
		async handler(ctx) {
			try {
				const defaultPath = resolvePath(ctx.workspacePath);
				const filePath = ctx.input.path
					? resolvePath(ctx.workspacePath, ctx.input.path as string)
					: defaultPath;

				const safeFilePath = resolveSafeChildPath(ctx.workspacePath, filePath);

				const content = await fs.readFile(safeFilePath, 'utf8');
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

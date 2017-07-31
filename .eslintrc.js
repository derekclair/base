/* @noflow */

/******************************************************************************/

const ERROR = 2;
const WARN = 1;
const OFF = 0;

/******************************************************************************/

module.exports = {
	env: {
		'node': true,
		'es6': true,
		'browser': true
	},
	parser: 'babel-eslint',
	parserOptions: {
		'ecmaFeatures': {
			'jsx': true
		},
		'sourceType': 'module'
	},
	plugins: [
		'babel',
		'import',
		'jsx-a11y',
		'security',
		'flowtype',
		'react'
	],
	extends: [
		'plugin:security/recommended',
		'plugin:jsx-a11y/recommended',
		'airbnb',
		'plugin:flowtype/recommended',
		'plugin:react/recommended'
	],
	root: true,
	rules: {
		'brace-style': [
			ERROR,
			'stroustrup',
			{
				'allowSingleLine': true
			}
		],
		'camelcase': OFF,
		'comma-dangle': [
			WARN,
			{
				'arrays': 'always-multiline',
				'exports': 'always-multiline',
				'functions': 'ignore',
				'imports': 'always-multiline',
				'objects': 'always-multiline'
			}
		],
		'default-case': OFF,
		// ________________________________________________________________ flowtype
		'flowtype/no-primitive-constructor-types': ERROR,
		'flowtype/no-types-missing-file-annotation': OFF,
		// __________________________________________________________________ import
		'import/extensions': OFF,
		'import/no-absolute-path': OFF,
		'import/no-extraneous-dependencies': OFF,
		'import/no-unresolved': [
			ERROR,
			{
				'ignore': [
					"^flow/",
					"^lib/",
					"^server/",
					"^src/",
					"^utils/",
					"^/"
				]
			}
		],
		'indent': [
			WARN,
			'tab',
			{
				'MemberExpression': 1,
				'VariableDeclarator': {
					'var': 2,
					'let': 2,
					'const': 3
				}
			}
		],
		// ________________________________________________________________ jsx-a11y
		'jsx-a11y/href-no-hash': OFF,
		'jsx-a11y/anchor-is-valid': [WARN, { 'aspects': ['invalidHref'] }],
		'jsx-a11y/img-has-alt': OFF, // Issue with 'jsx-a11y'
		'jsx-a11y/label-has-for': OFF, // Issue with 'jsx-a11y'
		'jsx-a11y/no-static-element-interactions': OFF,
		'max-statements-per-line': OFF,
		'no-confusing-arrow': [
			ERROR,
			{
				'allowParens': true
			}
		],
		'no-multi-spaces': WARN,
		'no-plusplus': OFF,
		'no-tabs': OFF,
		'no-underscore-dangle': [
			WARN,
			{
				'allowAfterThis': true
			}
		],
		// ___________________________________________________________________ react
		'react/jsx-closing-bracket-location': [
			WARN,
			'line-aligned'
		],
		'react/jsx-filename-extension': [WARN, { 'extensions': [".js", ".jsx"] }],
		'react/jsx-indent': [
			ERROR,
			'tab'
		],
		'react/jsx-indent-props': [
			ERROR,
			'tab'
		],
		'react/jsx-max-props-per-line': [
			WARN,
			{
				'maximum': 2,
				'when': 'multiline'
			}
		],
		'react/jsx-no-bind': [
			WARN,
			{
				'allowBind': false,
				'allowArrowFunctions': true,
				'ignoreRefs': true
			}
		],
		'react/jsx-uses-react': WARN,
		'react/jsx-wrap-multilines': OFF, // Issue with 'config-airbnb'
		'react/no-array-index-key': WARN,
		'react/no-string-refs': WARN,
		'react/prefer-stateless-function': WARN,
		'react/require-default-props': OFF,
		'react/sort-comp': [
			WARN,
			{ // TODO: get something defined here for Grow
				'order': [
					"type-annotations",
					"static-methods",
					"lifecycle",
					"/^on.+$/",
					"rendering",
					"everything-else"
				],
				'groups': {
					'rendering': [
						"/^render.+$/",
						"render"
					]
				}
			}
		],
		'spaced-comment': 0
	},
	settings: {
		'flowtype': {
			'onlyFilesWithFlowAnnotation': true
		}
	}
};

export default {
    options: {
        lazyHydrate: true,
        displayAllowedValues: ['flex', 'block', 'grid', 'inline-flex', 'inline-block', 'inline-grid'],
    },
    inherit: {
        type: 'ww-layout',
    },
    editor: {
        label: {
            en: 'Flexbox',
        },
        icon: 'border',
        bubble: {
            icon: 'border',
        },
        customStylePropertiesOrder: [
            'children',
            'backgroundVideo',
            ['backgroundVideoPoster', 'backgroundVideoSize', 'backgroundVideoLoop', 'backgroundVideoPreload'],
        ],
    },
    properties: {
        children: {
            label: {
                en: 'Items',
                fr: 'Items',
            },
            type: 'Info',
            options: {
                text: { en: 'Elements to repeat' },
            },
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.isFixed),
            bindable: 'repeatable',
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip:
                    'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        backgroundVideo: {
            label: 'Video',
            type: 'Video',
            options: {
                nullable: true,
            },
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
            bindingValidation: {
                markdown: 'background.video',
                type: 'string',
            },
        },
        backgroundVideoPoster: {
            label: 'Poster',
            type: 'Image',
            options: {
                nullable: true,
            },
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
            bindingValidation: {
                markdown: 'background.video.poster',
                type: 'string',
            },
            hidden: content => !content.backgroundVideo,
        },
        backgroundVideoSize: {
            label: 'Size',
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'cover', default: true, label: { en: 'Cover', fr: 'Couvrir' } },
                    { value: 'contain', label: { en: 'Contain', fr: 'Contenir' } },
                ],
            },
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
            bindingValidation: {
                markdown: 'background.video.size',
                type: 'string',
            },
            hidden: content => !content.backgroundVideo,
        },
        backgroundVideoLoop: {
            label: 'Loop',
            type: 'OnOff',
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
            bindingValidation: {
                markdown: 'background.video.loop',
                type: 'boolean',
            },
            hidden: content => !content.backgroundVideo,
        },
        backgroundVideoPreload: {
            label: 'Preload',
            type: 'OnOff',
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
            bindingValidation: {
                markdown: 'background.video.preload',
                type: 'boolean',
            },
            hidden: content => !content.backgroundVideo,
        },
    },
};

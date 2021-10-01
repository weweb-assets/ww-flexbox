export default {
    options: {
        lazyHydrate: true,
    },
    editor: {
        label: {
            en: 'Flexbox',
        },
        icon: 'border',
        menuOptions: {
            quick: {
                label: { en: 'Edit layout' },
                sections: ['direction', 'justifyContent', 'alignItems'],
                bind: [{ prop: 'children', label: { en: 'Repeat enclosed items' } }],
            },
        },
    },
    properties: {
        children: {
            label: {
                en: 'Items',
                fr: 'Items',
            },
            type: 'Info',
            options: {
                text: { en: 'Repeat element' },
            },
            bindable: 'repeatable',
            defaultValue: [],
        },
        direction: {
            label: { en: 'Direction', fr: 'Direction' },
            type: 'BigIconRadioGroup',
            options: {
                choices: [
                    { icon: 'arrow-down', value: 'column', label: 'Vertical' },
                    { icon: 'arrow-forward', value: 'row', label: 'Horizontal' },
                ],
            },
            responsive: true,
            defaultValue: 'row',
        },
        justifyContent: {
            label: { en: 'Justify' },
            type: 'TextRadioGroup',
            options: content => {
                if (content.direction === 'row') {
                    return {
                        choices: [
                            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start' },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
                            {
                                value: 'space-around',
                                title: { en: 'Space around', fr: 'Space around' },
                                icon: 'align-x-space-around',
                            },
                            {
                                value: 'space-between',
                                title: { en: 'Space between', fr: 'Space between' },
                                icon: 'align-x-space-between',
                            },
                        ],
                    };
                } else {
                    return {
                        choices: [
                            {
                                value: 'flex-start',
                                title: { en: 'Start', fr: 'Début' },
                                icon: 'align-x-start-vertical',
                            },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center-vertical' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end-vertical' },
                            {
                                value: 'space-around',
                                title: { en: 'Space around', fr: 'Space around' },
                                icon: 'align-x-space-around-vertical',
                            },
                            {
                                value: 'space-between',
                                title: { en: 'Space between', fr: 'Space between' },
                                icon: 'align-x-space-between-vertical',
                            },
                        ],
                    };
                }
            },
            responsive: true,
            defaultValue: 'center',
        },
        alignItems: {
            label: { en: 'Alignement' },
            type: 'TextRadioGroup',
            options: content => {
                if (content.direction === 'row') {
                    return {
                        choices: [
                            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-y-start' },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-y-center' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-y-end' },
                            { value: 'stretch', title: { en: 'Stretch', fr: 'Stretch' }, icon: 'align-y-stretch' },
                            { value: 'baseline', title: { en: 'Baseline', fr: 'Baseline' }, icon: 'align-y-baseline' },
                        ],
                    };
                } else {
                    return {
                        choices: [
                            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start' },
                            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center' },
                            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
                            { value: 'stretch', title: { en: 'Stretch', fr: 'Stretch' }, icon: 'align-x-stretch' },
                        ],
                    };
                }
            },
            responsive: true,
            defaultValue: 'stretch',
        },
        flexWrap: {
            label: { en: 'Wrap elements' },
            type: 'OnOff',
            hidden: content => content.direction !== 'row',
            responsive: true,
            defaultValue: true,
        },
        reverse: {
            label: { en: 'Reverse order', fr: "Inverser l'ordre" },
            type: 'OnOff',
            responsive: true,
            defaultValue: false,
        },
        pushLast: {
            label: { en: 'Push last to the end', fr: 'Push last to the end' },
            type: 'OnOff',
            responsive: true,
            defaultValue: false,
        },
    },
};
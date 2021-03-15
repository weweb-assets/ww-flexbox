const ALIGN_ROW = {
    label: { en: 'Alignement' },
    type: 'TextRadioGroup',
    options: {
        choices: [
            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-y-start' },
            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-y-center' },
            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-y-end' },
            { value: 'stretch', title: { en: 'Stretch', fr: 'Stretch' }, icon: 'align-y-stretch' },
            { value: 'baseline', title: { en: 'Baseline', fr: 'Baseline' }, icon: 'align-y-baseline' },
        ],
    },
};
const ALIGN_COLUMN = {
    label: { en: 'Alignement' },
    type: 'TextRadioGroup',
    options: {
        choices: [
            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start' },
            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center' },
            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
            { value: 'stretch', title: { en: 'Stretch', fr: 'Stretch' }, icon: 'align-x-stretch' },
        ],
    },
};

const JUSTIFY_CONTENT_ROW = {
    label: { en: 'Justify' },
    type: 'TextRadioGroup',
    options: {
        choices: [
            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start' },
            { value: 'center', title: { en: 'Center', fr: 'Milieu' }, icon: 'align-x-center' },
            { value: 'flex-end', title: { en: 'End', fr: 'Fin' }, icon: 'align-x-end' },
            { value: 'space-around', title: { en: 'Space around', fr: 'Space around' }, icon: 'align-x-space-around' },
            {
                value: 'space-between',
                title: { en: 'Space between', fr: 'Space between' },
                icon: 'align-x-space-between',
            },
        ],
    },
};
const JUSTIFY_CONTENT_COLUMN = {
    label: { en: 'Justify' },
    type: 'TextRadioGroup',
    options: {
        choices: [
            { value: 'flex-start', title: { en: 'Start', fr: 'Début' }, icon: 'align-x-start-vertical' },
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
    },
};

export function getConfiguration(content) {
    return {
        menuOptions: {
            quick: {
                label: { en: 'Edit layout' },
                sections: ['direction', 'justifyContent', 'alignItems'],
            },
        },
        styleOptions: {
            direction: {
                label: { en: 'Direction', fr: 'Direction' },
                type: 'BigIconRadioGroup',
                options: {
                    choices: [
                        { icon: 'arrow-down', value: 'column', label: 'Vertical' },
                        { icon: 'arrow-forward', value: 'row', label: 'Horizontal' },
                    ],
                },
            },
            ...(content.direction === 'row'
                ? {
                      justifyContent: JUSTIFY_CONTENT_ROW,
                      alignItems: ALIGN_ROW,
                  }
                : {
                      justifyContent: JUSTIFY_CONTENT_COLUMN,
                      alignItems: ALIGN_COLUMN,
                  }),
            reverse: {
                label: { en: 'Reverse order', fr: "Inverser l'ordre" },
                type: 'TextRadioGroup',
                options: {
                    choices: [
                        { title: 'off', value: false, default: true, label: 'Off' },
                        { title: 'on', value: true, label: 'On' },
                    ],
                },
            },
            pushLast: {
                label: { en: 'Push last to the end', fr: 'Push last to the end' },
                type: 'OnOff',
            },
        },
        settingsOptions: {
            maxItems: {
                label: { en: 'Number of items max', fr: 'Nombre maximal' },
                type: 'Number',
                options: {
                    nullable: true,
                    min: 1,
                    max: 100,
                },
            },
            pagination: {
                label: {
                    en: 'Use pagination ?',
                },
                type: 'TextRadioGroup',
                options: {
                    choices: [
                        { title: 'bottom', value: 'bottom', label: 'Bottom' },
                        { title: 'top', value: 'top', label: 'Top' },
                        { title: 'None', value: null, label: 'None' },
                    ],
                },
            },
        },
    };
}

<template>
    <wwLayout
        class="ww-flexbox"
        path="children"
        :direction="content.direction"
        :disable-edit="isFixed"
        ww-responsive="wwLayout"
        :tag="tag"
        v-bind="properties"
    >
        <template #header>
            <wwBackgroundVideo v-if="backgroundVideo" :video="backgroundVideo"></wwBackgroundVideo>
        </template>
        <template #default="{ item, index, itemStyle }">
            <wwElement
                v-bind="item"
                :extra-style="itemStyle"
                class="ww-flexbox__object"
                :ww-responsive="`wwobject-${index}`"
                @click="onElementClick(item.uid, index)"
            ></wwElement>
        </template>
    </wwLayout>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content:effect', 'update:content', 'element-event'],
    setup() {
        const { hasLink, tag: linkTag, properties } = wwLib.wwElement.useLink();
        const backgroundVideo = wwLib.wwElement.useBackgroundVideo();

        return {
            hasLink,
            linkTag,
            properties,
            backgroundVideo,
        };
    },
    computed: {
        children() {
            if (!this.content.children || !Array.isArray(this.content.children)) {
                return [];
            }
            return this.content.children;
        },
        isFixed() {
            return this.wwElementState.props.isFixed;
        },
        tag() {
            return this.hasLink ? this.linkTag : 'div';
        },
    },
    methods: {
        onElementClick(uid, index) {
            this.$emit('element-event', { type: 'click', uid, index });
        },
    },
};
</script>

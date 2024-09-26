<template>
    <wwLayout
        class="ww-flexbox"
        path="children"
        :direction="content.direction"
        :disable-edit="isFixed"
        ww-responsive="wwLayout"
        :tag="tag"
        v-bind="properties"
        :class="{ '-link': hasLink && !isEditing }"
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
                :data-ww-flexbox-index="index"
                @click="onElementClick"
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
        const { hasLink, tag, properties } = wwLib.wwElement.useLink();
        const backgroundVideo = wwLib.wwElement.useBackgroundVideo();

        return {
            hasLink,
            properties,
            backgroundVideo,
            tag,
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
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
    methods: {
        onElementClick(event) {
            // We would prefer having the index inside the callback in the template, but due to a strange way Vue is handling anynmous functions with scope slot, we need to pass the index as a data attribute or each time the parent rerender, all the children will also rerender
            let rawIndex = event.target.dataset.wwFlexboxIndex;
            let element = event.target;
            while(element !== this.$el && element.parentElement) {
                rawIndex = element.dataset.wwFlexboxIndex;
                element = element.parentElement;
            }
            
            let index = parseInt(rawIndex);
            if (isNaN(index)) {
                index = 0;
            }
            this.$emit('element-event', { type: 'click', index });
        },
    },
};
</script>

<style lang="scss" scoped>
.-link {
    cursor: pointer;
}
</style>

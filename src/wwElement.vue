<template>
    <div class="ww-flexbox">
        <wwLayout
            class="ww-flexbox__dropzone"
            path="children"
            :direction="content.direction"
            :style="style"
            :inherit-from-element="inheritFromElement"
            ww-responsive="wwLayout"
        >
            <template #default="{ item, index }">
                <wwElement
                    v-bind="item"
                    class="ww-flexbox__object"
                    :ww-responsive="`wwobject-${index}`"
                    :extra-style="getItemStyle(item, index)"
                ></wwElement>
            </template>
        </wwLayout>
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['update:content:effect', 'update:content'],
    data() {
        return {
            inheritFromElement: ['width', 'display'],
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        style() {
            return {
                flexDirection: this.content.direction,
                justifyContent: this.content.justifyContent,
                alignItems: this.content.alignItems,
                flexWrap:
                    this.content.direction === 'column'
                        ? 'nowrap'
                        : this.content.flexWrap === false
                        ? 'nowrap'
                        : 'wrap',
            };
        },
        // wwObjectFlex() {
        //     return this.content.alignItems === 'stretch' ? '1' : '';
        // },
        children() {
            if (!this.content.children || !Array.isArray(this.content.children)) {
                return [];
            }
            return this.content.children;
        },
    },
    watch: {
        /* wwEditor:start */
        'content.direction'(newDirection, oldDirection) {
            if (this.wwEditorState.isACopy) {
                return;
            }
            if (newDirection === 'column' && oldDirection !== newDirection && this.content.alignItems === 'baseline') {
                this.$emit('update:content:effect', { alignItems: 'flex-start' });
            }
        },
        /* wwEditor:end */
    },
    methods: {
        getItemStyle(item, index) {
            const style = {};

            //Reverse
            if (this.content.reverse) {
                style.order = this.children.length - 1 - index;
            } else {
                style.order = index;
            }

            //Push last
            if (this.content.pushLast) {
                const push = !this.content.reverse ? index === this.children.length - 1 : index === 0;
                if (push) {
                    if (this.content.direction === 'column') {
                        style.marginTop = 'auto';
                    } else {
                        style.marginLeft = 'auto';
                    }
                }
            }

            if (this.content.alignItems === 'stretch') {
                style.alignItems = 'stretch';
            }

            return style;
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-flexbox {
    position: relative;
    box-sizing: border-box;
    &__dropzone {
        display: flex;
        height: 100%;
        width: 100%;
    }
}
</style>

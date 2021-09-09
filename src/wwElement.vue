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
                <wwLayoutItem
                    class="ww-flexbox__item"
                    :style="getItemStyle(item, index)"
                    :ww-responsive="`index-${index}`"
                >
                    <wwObject
                        v-bind="item"
                        class="ww-flexbox__object"
                        :style="{ flex: wwObjectFlex }"
                        :ww-responsive="`wwobject-${index}`"
                    ></wwObject>
                </wwLayoutItem>
            </template>
        </wwLayout>
        <!-- wwEditor:start -->
        <div v-if="isEditing" class="ww-flexbox__menu">
            <wwEditorIcon small name="border"></wwEditorIcon>
        </div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
export default {
    wwDefaultContent: {
        children: [],
        reverse: wwLib.responsive(false),
        direction: wwLib.responsive('row'),
        justifyContent: wwLib.responsive('center'),
        alignItems: wwLib.responsive('stretch'),
        pushLast: wwLib.responsive(false),
    },
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
        wwObjectFlex() {
            return this.content.alignItems === 'stretch' ? '1' : 'unset';
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
            const style = {
                marginTop: 'unset',
                marginLeft: 'unset',
                minWidth: 'unset',
                alignItems: 'unset',
                display: 'block',
            };

            //Reverse
            if (this.content.reverse) {
                style.order = this.content.children.length - 1 - index;
            } else {
                style.order = index;
            }

            //Push last
            if (this.content.pushLast) {
                const push = !this.content.reverse ? index === this.content.children.length - 1 : index === 0;
                if (push) {
                    if (this.content.direction === 'column') {
                        style.marginTop = 'auto';
                    } else {
                        style.marginLeft = 'auto';
                    }
                }
            }

            if (this.content.direction === 'row') {
                style.minWidth = '40px';
            }

            if (this.content.alignItems === 'stretch') {
                style.display = 'flex';
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
    .ww-flexbox__menu {
        pointer-events: auto;
        opacity: 0;
        pointer-events: none;
        display: flex;
        position: absolute;
        border-radius: 100%;
        padding: var(--ww-spacing-01);
        transition: opacity 0.2s ease;
        z-index: 11;
        cursor: pointer;
        background-color: var(--ww-color-blue-500);
        color: white;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        transition: transform 0.3s ease;
        &:hover {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 1;
        }
    }
    &:hover {
        > .ww-flexbox__menu {
            opacity: 1;
            pointer-events: all;
        }
    }
}
</style>

<template>
    <div class="ww-flexbox">
        <Paginator v-if="content.pagination === 'top'" class="paginator"></Paginator>
        <wwLayout
            class="ww-flexbox__dropzone"
            path="children"
            :direction="content.direction"
            :style="style"
            :start="start"
            :pagination="!!content.pagination"
            :max="content.maxItem"
            type="flex"
            @update:total="total = $event"
            ww-responsive="wwLayout"
        >
            <template v-slot="{ item, index }">
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
        <Paginator v-if="content.pagination === 'bottom'" class="paginator"></Paginator>
        <!-- wwEditor:start -->
        <div class="ww-flexbox__menu">
            <wwEditorIcon small name="config"></wwEditorIcon>
        </div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
import Paginator from './Paginator.vue';
import { getConfiguration } from './config.js';

export default {
    name: '__COMPONENT_NAME__',
    components: { Paginator },
    wwDefaultContent: {
        children: [],
        reverse: wwLib.responsive(false),
        direction: wwLib.responsive('row'),
        justifyContent: wwLib.responsive('center'),
        alignItems: wwLib.responsive('start'),
        maxItem: wwLib.responsive(50),
        pagination: wwLib.responsive(null),
        pushLast: wwLib.responsive(false),
    },
    wwEditorConfiguration({ content }) {
        return getConfiguration(content);
    },
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    data() {
        return {
            start: 0,
            total: 0,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            return false;
        },
        style() {
            return {
                flexDirection: this.content.direction,
                justifyContent: this.content.justifyContent,
                alignItems: this.content.alignItems,
            };
        },
        wwObjectFlex() {
            return this.content.alignItems === 'stretch' ? '1' : 'unset';
        },
    },
    methods: {
        getItemStyle(item, index) {
            const style = {
                display: 'flex',
                width: 'unset',
            };

            //Reverse
            if (this.content.reverse) {
                style.order = this.content.children.length - 1 - index;
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

            //Flex
            const wwObject = this.$store.getters['websiteData/getWwObject'](item.uid);
            const width = wwLib.getResponsiveStyleProp({
                store: this.$store,
                style: (wwObject._state || {}).style || {},
                prop: 'width',
            });
            if (width && width.endsWith('%')) style.width = width;

            return style;
        },
    },
    watch: {
        'content.pagination'(isPaginated, wasPaginated) {
            if (this.wwEditorState.isACopy) {
                return;
            }
            if (isPaginated && !wasPaginated && !this.content.maxItem) {
                this.$emit('update-effect', { maxItem: 20 });
            }
        },
        'content.maxItem'(newVal, oldVal) {
            if (this.wwEditorState.isACopy) {
                return;
            }
            if (!newVal && oldVal && this.content.pagination) {
                this.$emit('update-effect', { pagination: null });
            }
        },
        'content.direction'(newDirection, oldDirection) {
            if (this.wwEditorState.isACopy) {
                return;
            }
            if (newDirection === 'column' && oldDirection !== newDirection && this.content.alignItems === 'baseline') {
                this.$emit('update-effect', { alignItems: 'flex-start' });
            }
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
        flex-wrap: wrap;
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

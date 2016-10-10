<template>
    <div>
        <action></action>
        <show></show>
    </div>
</template>

<script>

    import m_base from 'base/css/m_base.scss'
    import m_init from 'base/css/m_init.scss'
    import css from '../css/demo.scss'


    import action from './action.vue'
    import show from './show.vue'

    export default {
        components: {
            action: action,
            show: show
        }
    }
</script>
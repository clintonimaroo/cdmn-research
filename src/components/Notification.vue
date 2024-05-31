<template>
    <transition name="fade">
        <div v-if="visible" :class="['notification', type]" class="notification-container">
            <div class="notification-icon">
                <slot name="icon"></slot>
            </div>
            <div class="notification-message">{{ message }}</div>
            <button class="notification-close" @click="closeNotification">×</button>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'NotificationMessage',
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 5000,
        },
    },
    data() {
        return {
            visible: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.visible = false;
        }, this.duration);
    },
    methods: {
        closeNotification() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
.notification-container {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 10px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
}

.notification-icon {
    margin-right: 16px;
}

.notification-message {
    flex: 1;
}

.notification-close {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.notification.success {
    background-color: #28a745;
    color: white;
}

.notification.error {
    background-color: #dc3545;
    color: white;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

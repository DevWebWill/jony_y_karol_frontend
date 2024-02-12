<script>
export default {
    props: {
        message: {
            type: String,
            default: 'fsdfg'
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-alert')
        }
    },   
}
</script>
<template>
    <div>
        <Transition>
            <div v-if="message !== ''" tabindex="-1"  role="dialog" aria-modal="true" class="bg-black/[0.4] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-full justify-center items-center flex">
                <div class="relative  w-full max-w-md h-40">
                    <div class="relative bg-white rounded-lg shadow modal-fade-up h-full">
                        <!-- <div class="flex justify-between items-center px-6 rounded-t border-b dark:border-gray-600 h-16 py-2">
                            <div></div>
                            <button v-on:click="closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                            </button>
                        </div> -->

                        <div class="text-center flex justify-center items-center p-6 gap-4 h-full overflow-y-auto w-full">
                            {{ message }}
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
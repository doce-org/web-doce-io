<template>
  
    <div id="dashboard-debug-component" class="tile is-child">

        <div class="columns is-vcentered is-marginless has-text-centered">

            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-arrows"></i>
                </span>
            </div>

            <div class="column">
                <h6 class="title is-6">Debug</h6>
            </div>

            <!-- <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-cog"></i>
                </span>
            </div> -->

        </div>

    </div>

</template>

<script>

    export default {
    
    }

</script>

<style lang="scss">

    #dashboard-debug-component {
        height: 300px;
        background: white;

        .columns {

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &.content {
                padding: 2rem;
            }
        }
    }

</style>


<template>
  
    <div id="dashboard-temperature-component" class="tile is-4 is-child">

        <div class="columns is-vcentered is-marginless has-text-centered">

            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-arrows"></i>
                </span>
            </div>
            <div class="column">
                <h6 class="title is-6">Temperature</h6>
            </div>
            <div class="column is-narrow">
                <span class="icon">
                    <i class="fa fa-cog"></i>
                </span>
            </div>

        </div>

        <div class="columns is-marginless">

        </div>

    </div>

</template>

<script>

    export default {
    
    }

</script>

<style lang="scss">

    #dashboard-temperature-component {

        .columns {
            background: white;

            &:first-child {
                background: #f5f6f8;

                .icon {
                    color: #dedede;
                }
            }

            &:last-child {
                min-height: 300px;
            }
        }
    }

</style>



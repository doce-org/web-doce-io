<template>
  
    <div id="dashboard-automation-component" class="tile is-child">

        <div class="columns is-marginless">

            <div class="column">

                <div class="columns">

                    <div class="column has-text-centered">
                        <h6 class="title is-6">Controle du materiel</h6>
                    </div>

                </div>

            </div>

            <div class="column is-narrow"></div>

        </div>

    </div>

</template>

<script>

    export default {
    
    }

</script>

<style lang="scss">

    #dashboard-automation-component {

        .columns {

            &:first-child {

                & > .column {
                    background: white;

                    &.is-narrow {
                        background: #F5F6F8;
                        width: 150px;
                    }
                }
            }
        }
    }

</style>



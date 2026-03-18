<template>
    <div>
        <HeaderComp>Nuestra historia</HeaderComp>

        <v-container max-width="85%">
            <v-row gap="16">
                <v-col col="12" sm="4" lg="5">

                    <h2>SOBRE NOSOTROS</h2>
                    <p>Asbuilt es una empresa familiar, la cual nace el año 2006 posterior a una larga trayectoria de
                        los
                        socios en el rubro.</p>

                    <p>Traducidos en más de 25 años de experiencia en el área de la arquitectura, ingeniería y
                        construcción, hemos logrado formar un equipo de especialistas que nos han permitido entregar un
                        servicio de primera calidad para desarrollar y/o construir proyectos de arquitectura incluyendo
                        todas sus especialidades.
                    </p>
                    <h2>NUESTRA FILOSOFÍA</h2>
                    <p>Cuidar el proceso como el resultado.<br>
                        Para nosotros es sumamente importante la experiencia de nuestro cliente desde que nos contacta
                        hasta el termino de la ejecución de una obra.
                    </p>
                </v-col>

                <v-col col="12" sm="8" lg="7">
                    <v-img width="100%" aspect-ratio="4/3" cover src="https://picsum.photos/id/684/600/400">
                    </v-img>
                </v-col>
            </v-row>
        </v-container>

        
    </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';

</script>

<style lang="css" scoped></style>
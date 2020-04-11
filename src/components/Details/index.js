import React, { Component } from 'react';

import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './styles';

import uberxImage from '../../assets/uberx.png';

export default class Details extends Component {
    render(){
        return (
            <Container>
                <TypeTitle>Popular</TypeTitle>
                <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>
                <TypeImage source={uberxImage}></TypeImage>

                <TypeTitle>UberX</TypeTitle>
                <TypeDescription>R$6,00</TypeDescription>

                <RequestButton onPress={ () => { console.log('Olha só, estou pedindo um Uber :)') } }>
                    <RequestButtonText>Solicitar UberX</RequestButtonText>
                </RequestButton>
            </Container>
        );
    }
}
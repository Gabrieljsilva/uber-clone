import Styled from 'styled-components/native';

export const Container = Styled.View`
    background: #FFF;
    height: 300px;
    width: 100%;
    bottom: 0;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 0.2;
    shadow-radius: 10px;
    elevation: 3;
    border: 1px solid #DDD;
    align-items: center;
    padding: 20px;
`;

export const TypeTitle = Styled.Text`
    font-size: 25px;
    color: #222;
`;

export const TypeDescription = Styled.Text`
    font-size: 14px;
    color: #666;
`;

export const TypeImage = Styled.Image`
    height: 80px;
    margin: 10px 0;
`;

export const RequestButton = Styled.TouchableOpacity`
    background: #222;
    justify-content: center;
    align-items: center;
    height: 44px;
    align-self: stretch;
    margin-top: 10px;
`;

export const RequestButtonText = Styled.Text`
    color: #FFF;
    font-weight: bold,
    font-size: 18px;
`;
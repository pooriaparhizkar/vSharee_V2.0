import React from 'react';
import { ReduxState } from 'interface';
import { connect, ConnectedProps } from 'react-redux';
import './alphabetPhoto.style.scss';
import { AlphabetPhotoProps } from './alphabetPhoto.interface';

const AlphabetPicture: React.FC<ConnectedProps<typeof connector> & AlphabetPhotoProps> = function (
    props: ConnectedProps<typeof connector> & AlphabetPhotoProps,
) {
    function generateLightColorHex() {
        let color = '#';
        for (let i = 0; i < 3; i++)
            color += ('0' + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
        return color;
    }
    return (
        <div className={`vsharee-alphabet-photo `}>
            <h2
                className={`${props.type} ${props.size}`}
                style={{
                    backgroundColor: generateLightColorHex(),
                }}
            >
                {props.title.charAt(0).toUpperCase()}
            </h2>
        </div>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    text: state.language,
});

const connector = connect(mapStateToProps);
export default connector(AlphabetPicture);

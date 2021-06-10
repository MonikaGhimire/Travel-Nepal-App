import * as React from 'react';
import { Form, Button } from "react-bootstrap";
import Styles from "./Destination.module.scss";
import { uploadImagesQuery, DestinationAddPatchQuery } from "../../global-store/Queries";

export interface IUploadImagesProps {
    destinationId: string;
    authToken: any;
    history: any;
}

export interface IUploadImagesState {
    images: any;
    hasSelectedImages: boolean;
    imageUrls: any;
}

export class UploadImages extends React.Component<IUploadImagesProps, IUploadImagesState> {
    constructor(props: IUploadImagesProps) {
        super(props);
        this.state = {
            images: [],
            hasSelectedImages: false,
            imageUrls: [],
        }
    }

    render() {
        return (
            <>
                <Form className={Styles.form}>
                    <Form.Group className={Styles["image-upload-container"]}>
                        <Form.Control className={Styles["image-upload-text"]} draggable={true} type="file" id="file-1" multiple onChange={this.handleFileUpload} />
                        {this.renderUploadedImagesList()}
                    </Form.Group>
                    <div className={Styles["buttons-container"]}>
                        <Button disabled={!this.state.hasSelectedImages} variant="success" type="button" className={Styles["button-submit"]} onClick={this.handleClickUploadButton}>
                            Upload Image
                        </Button>
                        <Button href={"/"} variant="secondary" type="button" className={Styles["cancel-button"]}>
                            Cancel
                    </Button>
                    </div>
                </Form>
            </>
        );
    }

    private renderUploadedImagesList = () => {
        return this.state.images.length > 0 ? (
            <div className={Styles["image-progress-container"]}>
                <h3 className={Styles["image-upload-header"]}>Uploading</h3>
                {this.renderUploadedImageDetails()}
            </div>
        ) : <h3 className={Styles["image-upload-header"]}>No images selected</h3>;
    }

    private renderUploadedImageDetails = () => {
        return this.state.images.map((image: any, index: number) => {
            return (
                <div key={`image-${index}`} className={Styles["progress-bar-container"]}>
                    <span className={Styles["image-data"]}>{image.name}</span>
                    <span className={Styles["image-data"]}>{this.bytesToMegaBytes(image.size)} mb</span>
                </div>
            )
        })
    }

    private bytesToMegaBytes = (bytes: any) => (bytes / (1024 * 1024)).toFixed(2);

    private handleFileUpload = (e: any) => {
        const currentState: IUploadImagesState = { ...this.state };
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            currentState.images.splice(i, 0, files[i])
        }
        currentState.hasSelectedImages = currentState.images.length > 0 ? true : false;
        this.setState(currentState);
    }

    private handleClickUploadButton = async () => {
        let newImageUrls = new Array;

        const promises: any = [];

        this.state.images.map(async (image: any) => {
            let formData = new FormData();
            formData.append('File', image);
            promises.push(uploadImagesQuery(formData, this.props.authToken));
        });

        Promise.all(promises).then((values: any) => {
            values.map((value: any) => {
                newImageUrls.push(value.imageUrl);
            })
            this.setState({
                imageUrls: newImageUrls
            }, async () => {
                await DestinationAddPatchQuery(
                    {
                        imageUrls: this.state.imageUrls,
                        uuid: this.props.destinationId
                    },
                    this.props.authToken);
                    window.location.replace("/");
            });
        });
    };
}

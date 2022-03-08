import { DocumentCard, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps, IDocumentCardStyles, ImageFit } from 'office-ui-fabric-react';
import * as React from 'react';
import { IProduct } from '../../../common/models';

export interface IProductItemProps {
    product: IProduct;
}

export default function ProductItem(props: IProductItemProps) {
    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 }
    }

    const previewProps: IDocumentCardPreviewProps = {
        previewImages: [
            {
                previewImageSrc: props.product.ImageUrl,
                imageFit: ImageFit.cover,
                height: 350
            }
        ]
    }

    return (<DocumentCard
        aria-label={props.product.Title}
        className="ms-motion-fadein"
        styles={cardStyles}
    >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle
            title={props.product.Title}
        ></DocumentCardTitle>
        <DocumentCardTitle
            title={`${props.product.Price.toFixed(0)} TRY`}
            showAsSecondaryTitle
        >

        </DocumentCardTitle>
    </DocumentCard>)
}
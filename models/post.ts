
import { ContentItem, Elements } from '@kentico/kontent-delivery';
import {Author} from "./author";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Post extends ContentItem {
    public title?: Elements.TextElement;
    public image?: Elements.AssetsElement;
    public untitledUrlSlug?: Elements.UrlSlugElement;
    public urlSlug?: Elements.TextElement;
    public content?: Elements.RichTextElement;
    public articleCategorization?: Elements.TaxonomyElement;
    public authorBio?: Elements.LinkedItemsElement<Author>;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'untitled_url_slug') {
                    return 'untitledUrlSlug';
                }
                if (elementName === 'url_slug') {
                    return 'urlSlug';
                }
                if (elementName === 'article_categorization') {
                    return 'articleCategorization';
                }
                if (elementName === 'author_bio') {
                    return 'authorBio';
                }
                return elementName;
            })
        });
    }
}

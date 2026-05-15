import type { Schema, Struct } from '@strapi/strapi';

export interface ComponenteEnlace extends Struct.ComponentSchema {
  collectionName: 'components_componente_enlaces';
  info: {
    displayName: 'Enlace';
    icon: 'dashboard';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    label: Schema.Attribute.String;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'HeroSection';
    icon: 'apps';
  };
  attributes: {
    enlace: Schema.Attribute.Component<'componente.enlace', false>;
    Header: Schema.Attribute.String & Schema.Attribute.Required;
    Image_hero: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Sub_header: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'componente.enlace': ComponenteEnlace;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}

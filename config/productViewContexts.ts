
export type ProductViewContext = {
    hidePrice: boolean;
    hideCart: boolean;
    showWhatsapp: boolean;
    allowFavorites: boolean;
};

export const PARTICULAR_VIEW: ProductViewContext = {
    hidePrice: false,
    hideCart: false,
    showWhatsapp: false,
    allowFavorites: true,
};

export const REVENTA_VIEW: ProductViewContext = {
    hidePrice: true,
    hideCart: true,
    showWhatsapp: true,
    allowFavorites: false,
};

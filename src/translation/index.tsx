import type { FC } from "hono/jsx";
import type { TooltipProps } from "../components/ui/Tooltip";
import { language } from "../metadata";
import {
	Translation as EnUSTranslation,
	translation as enUSTranslation,
} from "./en-US";
import {
	Translation as JaJPTranslation,
	translation as jaJPTranslation,
} from "./ja-JP";

/**
 * Translation dictionary for UI attributes and aria labels.
 *
 * @example
 * translation.closeMenu()
 * translation.showInformation({ name: "foo" })
 */
export type TranslationObject = {
	htmlLang: () => string;
	documentationTitle: () => string;
	close: () => string;
	closeMenu: () => string;
	closeSearch: () => string;
	openMenu: () => string;
	openSearch: () => string;
	showInformation: (props: { name: string }) => string;
	tooltipKind: (props: { kind: TooltipProps["kind"] }) => string;
};

type TranslationComponentKey =
	// Function tooltips
	| "elementFunction"
	| "elementFunctionDescription"
	| "contextFunction"
	| "contextFunctionDescription"
	// Section tooltips
	| "constructor"
	| "constructorDescription"
	| "definitions" // See also `definitionsOf`
	| "definitionsDescription"
	| "parameters"
	| "parametersDescription"
	// Parameter tooltips
	| "variadic"
	| "variadicDescription"
	| "settable"
	| "settableDescription"
	| "positional"
	| "positionalDescription"
	| "required"
	| "requiredDescription"
	// Other texts in documentation
	| "tutorial"
	| "tutorialDescription"
	| "reference"
	| "referenceDescription"
	| "defaultValue"
	| "stringValues"
	| "showExample"
	// Translation statuses
	| "untranslated"
	| "untranslatedMessage"
	| "communityContent"
	| "contentAddedByCommunity"
	| "partiallyTranslated"
	| "partiallyTranslatedMessage"
	| "translated"
	| "translatedMessage"
	// Header, sidebar, and footer
	| "document"
	| "langVersion"
	| "translationRate"
	| "search"
	| "typstOfficialWebsite"
	| "typstOfficialDocs"
	| "openOfficialDocs"
	| "tableOfContents"
	| "footer"
	| "previousPage"
	| "nextPage"
	// Site notice
	| "siteNoticeBannerTitle"
	| "siteNoticeBannerDescription";

export type TranslationComponentProps =
	| { translationKey: TranslationComponentKey }
	| { translationKey: "definitionsOf"; name: string };

/**
 * Translation component for UI text, descriptions, and other content to be embedded as JSX.
 *
 * @example
 * <Translation translationKey="definitions" />
 */
export type TranslationComponent = FC<TranslationComponentProps>;

// Switch translation language.
const { Translation, translation } = (() => {
	switch (language) {
		case "ja-JP":
			return { Translation: JaJPTranslation, translation: jaJPTranslation };
		case "en-US":
			return { Translation: EnUSTranslation, translation: enUSTranslation };
		default:
			throw new Error(`Unsupported language: ${language}`);
	}
})();
export { Translation, translation };

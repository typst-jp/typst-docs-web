import type { FC } from "hono/jsx";
import { translation } from "../../translation/";
import type { WithDeprecation } from "../../types/model";
import { normalizeDeprecation } from "../../utils/normalizeModel.js";
import { AlertTriangleIcon } from "../icons";

type DeprecationWarningProps = {
	item: WithDeprecation;
	level: "top" | "scoped";
};

/**
 * Generate a deprecation warning if the item deprecated; return null otherwise.
 */
export const DeprecationWarning: FC<DeprecationWarningProps> = ({
	item,
	level,
}) => {
	const message = formatMessage(item);
	if (!message) {
		return null;
	}

	const body = (
		<small className="deprecation ml-2 flex items-center bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200">
			<div className="w-4 h-4 text-yellow-500 mr-1.5 flex-shrink-0">
				<AlertTriangleIcon />
			</div>
			<span className="text-xs text-yellow-800">{message}</span>
		</small>
	);

	return level === "top" ? (
		<div className="mt-1">{body}</div>
	) : (
		<div className="mt-2">{body}</div>
	);
};

function formatMessage(item: WithDeprecation): string | null {
	const deprecation = normalizeDeprecation(item);

	if (deprecation) {
		const { message, until } = deprecation;
		if (until) {
			return translation.deprecationWarning({ message, until });
		}
		return message;
	}
	return null;
}

import { onBeforeUnmount, ref, readonly, type Ref } from 'vue';

type ReleaseHandler = () => void;

// Provides a trigger function that auto-resets after delay and an onRelease hook.
export function useAutoResetRef(
	defaultDelayMs: number = 400
): readonly [
	Readonly<Ref<boolean>>,
	(next: boolean, delayMs?: number) => void,
	(handler: ReleaseHandler) => () => void
] {
	let timerId: number | undefined;
	const state = ref<boolean>(false);
	const releaseHandlers = new Set<ReleaseHandler>();

	const clearTimer = () => {
		if (timerId !== undefined) {
			clearTimeout(timerId);
			timerId = undefined;
		}
	};

	const fireRelease = () => {
		for (const handler of releaseHandlers) {
			try {
				handler();
			} catch {
				// ignore handler errors
			}
		}
	};

	const setValue = (next: boolean, delayMs?: number) => {
		// If setting to true, start/restart countdown to reset to false
		if (next === true) {
			state.value = true;
			clearTimer();
			timerId = setTimeout(() => {
				state.value = false;
				fireRelease();
				timerId = undefined;
			}, (delayMs ?? defaultDelayMs)) as unknown as number;
			return;
		}

		// If setting to false, clear any timer and fire release if transitioning
		if (next === false) {
			const wasTrue = state.value === true;
			state.value = false;
			clearTimer();
			if (wasTrue) {
				fireRelease();
			}
		}
	};

	const onRelease = (handler: ReleaseHandler) => {
		releaseHandlers.add(handler);
		return () => {
			releaseHandlers.delete(handler);
		};
	};

	onBeforeUnmount(() => {
		clearTimer();
		releaseHandlers.clear();
	});

	return [readonly(state), setValue, onRelease] as const;
}



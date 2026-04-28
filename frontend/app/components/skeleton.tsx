import { twMerge } from 'tailwind-merge'

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={twMerge('animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700', className)}
			{...props}
		/>
	)
}

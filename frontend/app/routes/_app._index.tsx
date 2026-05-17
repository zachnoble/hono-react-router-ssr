import { useState } from 'react'
import type { DateValue, RangeValue } from 'react-aria-components'
import { TableBody } from 'react-aria-components'
import { useListData } from 'react-stately'

import { Autocomplete } from '~/components/autocomplete'
import { Badge } from '~/components/badge'
import { Breadcrumb, Breadcrumbs } from '~/components/breadcrumbs'
import { Button } from '~/components/button'
import Callout, { CalloutDescription, CalloutHeading, CalloutIcon } from '~/components/callout'
import { Checkbox, CheckboxGroup, Checkboxes } from '~/components/checkbox'
import { DatePicker, DatePickerButton } from '~/components/date-picker'
import { DateRangePicker, DateRangePickerButton } from '~/components/date-range-picker'
import {
	Dialog,
	DialogBody,
	DialogCloseButton,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '~/components/dialog'
import { Label } from '~/components/field'
import { InformationCircleIcon } from '~/components/icons/solid/information-circle'
import { Modal } from '~/components/modal'
import { Select } from '~/components/select'
import { Skeleton } from '~/components/skeleton'
import { Cell, Column, Row, Table, TableHeader } from '~/components/table'
import { Tab, TabList, TabPanel, Tabs } from '~/components/tabs'
import { TagsInput, TagsInputField } from '~/components/tag-input'
import type { Option } from '~/components/types/option'
import { ToggleTheme } from '~/features/themes/components/toggle-theme'

const FRUITS: Option[] = [
	{ id: 'apple', name: 'Apple' },
	{ id: 'banana', name: 'Banana' },
	{ id: 'cherry', name: 'Cherry' },
	{ id: 'date', name: 'Date' },
	{ id: 'elderberry', name: 'Elderberry' },
]

const SIZE_OPTIONS: Option[] = [
	{ id: 'sm', name: 'Small' },
	{ id: 'md', name: 'Medium' },
	{ id: 'lg', name: 'Large' },
	{ id: 'xl', name: 'Extra Large' },
]

const PEOPLE = [
	{ id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Inactive' },
	{ id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active' },
	{ id: 3, name: 'Carol White', role: 'Manager', status: 'Inactive' },
	{ id: 4, name: 'Dan Brown', role: 'Engineer', status: 'Active' },
]

function fruitFetcher({ filterText }: { signal: AbortSignal; filterText: string }) {
	return Promise.resolve({
		items: FRUITS.filter((f) => f.name.toLowerCase().includes(filterText.toLowerCase())),
	})
}

export default function Home() {
	const [selectedFruit, setSelectedFruit] = useState<Option | null>(null)
	const [size, setSize] = useState('')
	const [features, setFeatures] = useState<string[]>([])
	const [date, setDate] = useState<DateValue | null>(null)
	const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(null)
	const tags = useListData({ initialItems: [{ id: 1, name: 'React' }] })

	return (
		<div className='max-w-xl space-y-8 p-4'>
			<section className='space-y-2'>
				<p className='text-sm font-medium'>Breadcrumbs</p>
				<Breadcrumbs>
					<Breadcrumb to='/'>Home</Breadcrumb>
					<Breadcrumb to='/settings'>Settings</Breadcrumb>
					<Breadcrumb to='#' aria-current='page'>
						Profile
					</Breadcrumb>
				</Breadcrumbs>
			</section>

			<ToggleTheme />

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Skeleton</p>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
					<Skeleton className='h-8 w-full' />
				</div>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Autocomplete</p>
				<Autocomplete
					fetcher={fruitFetcher}
					selectedItem={selectedFruit}
					onSelectionChange={setSelectedFruit}
					placeholder='Search fruits...'
				/>
				{selectedFruit && (
					<p className='text-muted text-sm'>Selected: {selectedFruit.name}</p>
				)}
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Select</p>
				<Select
					name='size'
					value={size}
					onChange={setSize}
					options={SIZE_OPTIONS}
					placeholder='Pick a size'
					clearable
				/>
				{size && <p className='text-muted text-sm'>Selected: {size}</p>}
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Checkboxes</p>
				<CheckboxGroup value={features} onChange={setFeatures}>
					<Checkboxes>
						<Checkbox value='dark-mode'>Dark mode</Checkbox>
						<Checkbox value='notifications'>Notifications</Checkbox>
						<Checkbox value='analytics'>Analytics</Checkbox>
					</Checkboxes>
				</CheckboxGroup>
				{features.length > 0 && (
					<p className='text-muted text-sm'>Enabled: {features.join(', ')}</p>
				)}
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Date Picker</p>
				<DatePicker value={date} onChange={setDate}>
					<DatePickerButton>Pick a date</DatePickerButton>
				</DatePicker>
				{date && <p className='text-muted text-sm'>Selected: {date.toString()}</p>}
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Date Range Picker</p>
				<DateRangePicker value={dateRange} onChange={setDateRange}>
					<DateRangePickerButton>Pick a date range</DateRangePickerButton>
				</DateRangePicker>
				{dateRange && (
					<p className='text-muted text-sm'>
						{dateRange.start.toString()} – {dateRange.end.toString()}
					</p>
				)}
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Tag Input</p>
				<TagsInputField list={tags}>
					<Label>Tags</Label>
					<TagsInput />
				</TagsInputField>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Badges</p>
				<div className='flex gap-3'>
					<Badge color='amber'>Banana</Badge>
					<Badge color='red'>Apple</Badge>
					<Badge color='indigo'>Grape</Badge>
					<Badge color='rose'>Cherry</Badge>
					<Badge color='green'>Avocado</Badge>
				</div>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Dialog</p>
				<DialogTrigger>
					<Button variant='outline'>Open Dialog</Button>
					<Modal>
						<Dialog>
							<DialogHeader>Edit Profile</DialogHeader>
							<DialogCloseButton />
							<DialogBody>
								<p className='text-sm'>
									Make changes to your profile here. Click save when you're done.
								</p>
							</DialogBody>
							<DialogFooter>
								<Button slot='close' variant='outline'>
									Cancel
								</Button>
								<Button slot='close' variant='solid' color='accent'>
									Save changes
								</Button>
							</DialogFooter>
						</Dialog>
					</Modal>
				</DialogTrigger>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Alert Dialog</p>
				<DialogTrigger>
					<Button variant='outline' color='red'>
						Delete item
					</Button>
					<Modal>
						<Dialog alert>
							<DialogHeader>Are you absolutely sure?</DialogHeader>
							<DialogCloseButton />
							<DialogBody>
								<p className='text-sm'>
									This action cannot be undone. This will permanently delete the
									item and remove it from our servers.
								</p>
							</DialogBody>
							<DialogFooter>
								<Button slot='close' variant='outline'>
									Cancel
								</Button>
								<Button slot='close' variant='solid' color='red'>
									Delete
								</Button>
							</DialogFooter>
						</Dialog>
					</Modal>
				</DialogTrigger>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Callout</p>
				<div className='space-y-3'>
					<Callout color='zinc'>
						<CalloutIcon>
							<InformationCircleIcon />
						</CalloutIcon>
						<CalloutHeading>Heads up</CalloutHeading>
						<CalloutDescription>
							You can add components to your app using the CLI.
						</CalloutDescription>
					</Callout>
					<Callout color='blue'>
						<CalloutHeading>New feature</CalloutHeading>
						<CalloutDescription>
							Real-time collaboration is now available on all plans.
						</CalloutDescription>
					</Callout>
					<Callout color='red'>
						<CalloutHeading>Destructive action</CalloutHeading>
						<CalloutDescription>
							This cannot be undone once confirmed.
						</CalloutDescription>
					</Callout>
				</div>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Tabs</p>
				<div className='space-y-6'>
					<Tabs>
						<TabList aria-label='Underline tabs'>
							<Tab id='overview'>Overview</Tab>
							<Tab id='analytics'>Analytics</Tab>
							<Tab id='settings'>Settings</Tab>
						</TabList>
						<TabPanel id='overview'>Overview content</TabPanel>
						<TabPanel id='analytics'>Analytics content</TabPanel>
						<TabPanel id='settings'>Settings content</TabPanel>
					</Tabs>
					<Tabs variant='segment'>
						<TabList aria-label='Segment tabs'>
							<Tab id='week'>Week</Tab>
							<Tab id='month'>Month</Tab>
							<Tab id='year'>Year</Tab>
						</TabList>
						<TabPanel id='week'>Weekly view</TabPanel>
						<TabPanel id='month'>Monthly view</TabPanel>
						<TabPanel id='year'>Yearly view</TabPanel>
					</Tabs>
				</div>
			</section>

			<section className='space-y-2'>
				<p className='text-sm font-medium'>Table</p>
				<Table aria-label='People' selectionMode='multiple'>
					<TableHeader>
						<Column isRowHeader>Name</Column>
						<Column>Role</Column>
						<Column>Status</Column>
					</TableHeader>
					<TableBody>
						{PEOPLE.map((person) => (
							<Row key={person.id} id={person.id}>
								<Cell>{person.name}</Cell>
								<Cell>{person.role}</Cell>
								<Cell>{person.status}</Cell>
							</Row>
						))}
					</TableBody>
				</Table>
			</section>
		</div>
	)
}

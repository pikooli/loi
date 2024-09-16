<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Project } from "$types";
  
	let projectData: Project = {
	  projectName: '',
	  projectUrl: '',
	  contactEmail: '',
	  projectDescription: '',
	  commitmentText: '',
	};
  
	let firstName = '';
	let lastName = '';
	let signerEmail = '';
	let commitmentText = '';
  
	onMount(() => {
	  const data = $page.params.data;
	  try {
		const jsonString = atob(data);
		projectData = JSON.parse(jsonString);
		commitmentText = projectData.commitmentText;
	  } catch (error) {
		console.error('Error decoding data:', error);
	  }
	});
  
	async function submitSignature() {
	  const signatureData = {
		...projectData,
		signer: {
		  firstName,
		  lastName,
		  email: signerEmail,
		},
		commitmentText,
	  };
  
	  const response = await fetch('/api/sign-letter', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ data: signatureData }),
	  });
  
	  if (response.ok) {
		alert('The letter of commitment has been sent successfully!');
	  } else {
		alert('Error sending the letter.');
	  }
	}
  </script>
  
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
	<h2 class="text-3xl font-bold mb-4 text-center capitalize">{projectData.projectName}</h2>
	<p class="mb-4 text-gray-700">{projectData.projectDescription}</p>
  
	{#if projectData.projectUrl}
	  <a
		href="{projectData.projectUrl}"
		target="_blank"
		class="text-blue-600 hover:underline mb-6 inline-block"
	  >
		Visit the Project
	  </a>
	{/if}
  

  
	<h2 class="text-2xl font-semibold mb-2">Commitment Text</h2>
	<textarea
	  bind:value={commitmentText}
	  class="w-full p-3 border border-gray-300 rounded-md h-32 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
	></textarea>

	<div class="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
		<p class="font-semibold">Please Note:</p>
		<p>
		  Signing this Letter of Intent (LOI) is not legally binding and does not constitute a contract.
		  It is a preliminary document expressing your interest and intention without creating any legal obligations.
		</p>
	  </div>

	<h2 class="text-2xl font-semibold mb-2">Sign the Letter of Intent</h2>
	<form on:submit|preventDefault={submitSignature} class="space-y-6">
	  <div class="flex flex-wrap -mx-2">
		<div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
		  <label class="block text-gray-700 mb-1" for="firstName">First Name</label>
		  <input
			type="text"
			id="firstName"
			bind:value={firstName}
			placeholder="First Name"
			required
			class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		  />
		</div>
		<div class="w-full md:w-1/2 px-2">
		  <label class="block text-gray-700 mb-1" for="lastName">Last Name</label>
		  <input
			type="text"
			id="lastName"
			bind:value={lastName}
			placeholder="Last Name"
			required
			class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		  />
		</div>
	  </div>
	  <div>
		<label class="block text-gray-700 mb-1" for="signerEmail">Email</label>
		<input
		  type="email"
		  bind:value={signerEmail}
		  placeholder="Email"
		  id="signerEmail"
		  required
		  class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	  </div>
	  <button
		type="submit"
		class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
	  >
		Sign
	  </button>
	</form>
  </div>
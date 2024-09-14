<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Project } from "$types";
	let projectData:Project = {
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
		body: JSON.stringify({data: signatureData}),
	  });
  
	  if (response.ok) {
		alert('The letter of commitment has been sent successfully!');
	  } else {
		alert('Error sending the letter.');
	  }
	}
  </script>
  
  <div class="max-w-2xl mx-auto p-4">
	<h1 class="text-4xl font-bold mb-4">Sign the Letter of Intent</h1>
	<h1 class="text-3xl font-bold mb-4">{projectData.projectName}</h1>
	<p class="mb-4">{projectData.projectDescription}</p>
	<a
	  href="{projectData.projectUrl}"
	  target="_blank"
	  class="text-blue-600 hover:underline mb-6 inline-block"
	>
	  Visit the Project
	</a>
  
	<h2 class="text-2xl font-semibold mb-2">Commitment Text</h2>
	<textarea
	  bind:value={commitmentText}
	  class="w-full p-2 border border-gray-300 rounded h-32 mb-6"
	></textarea>
  
	<h2 class="text-2xl font-semibold mb-2">Sign the Letter of Intent</h2>
	<form on:submit|preventDefault={submitSignature} class="space-y-4">
	  <input
		type="text"
		bind:value={firstName}
		placeholder="First Name"
		required
		class="w-full p-2 border border-gray-300 rounded"
	  />
	  <input
		type="text"
		bind:value={lastName}
		placeholder="Last Name"
		required
		class="w-full p-2 border border-gray-300 rounded"
	  />
	  <input
		type="email"
		bind:value={signerEmail}
		placeholder="Email"
		required
		class="w-full p-2 border border-gray-300 rounded"
	  />
	  <button
		type="submit"
		class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
	  >
		Sign
	  </button>
	</form>
  </div>
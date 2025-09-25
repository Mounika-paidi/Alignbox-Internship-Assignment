document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const incognitoButton = document.getElementById('incognito-icon');


    const myUsername = "Abhay Shukla";
    const myProfilePic = "abhay-profile.jpg"; 

    const anonymousUser = "Anonymous";
    const anonymousProfilePic = "anonymous-profile.png";

    const kirtidanUser = "Kirtidan Gadhvi";
    const kirtidanProfilePic = "kirtidan-profile.jpg";

    
    let isAnonymous = false;

    
    const userProfiles = {
        [myUsername]: myProfilePic,
        [anonymousUser]: anonymousProfilePic,
        [kirtidanUser]: kirtidanProfilePic
    };

  
    incognitoButton.addEventListener('click', () => {
        isAnonymous = !isAnonymous;
        incognitoButton.classList.toggle('active', isAnonymous);
        if (isAnonymous) {
            
            const incognitoMessage = document.createElement('div');
            incognitoMessage.classList.add('incognito-message');
            incognitoMessage.textContent = "Now you’re appearing as Anonymous!";
            chatMessages.appendChild(incognitoMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

 
    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${formattedMinutes} ${ampm}`;
    }

   
    function renderMessages(messages) {
        chatMessages.innerHTML = '';
        messages.forEach(msg => {
            const isSent = msg.sender_name === myUsername || (isAnonymous && msg.sender_name === anonymousUser);
            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble', isSent ? 'sent' : 'received');

            const profilePicSrc = !isSent ? userProfiles[msg.sender_name] || anonymousProfilePic : null;

            if (profilePicSrc) {
                const profilePic = document.createElement('img');
                profilePic.classList.add('profile-pic');
                profilePic.src = profilePicSrc;
                messageBubble.appendChild(profilePic);
            }

            const messageInfo = document.createElement('div');
            messageInfo.classList.add('message-info');

           
            if (!isSent) { 
                const senderName = document.createElement('div');
                senderName.classList.add('message-sender');
                senderName.textContent = msg.sender_name;
                messageInfo.appendChild(senderName);
            }
            

            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            messageContent.textContent = msg.message_text;
            messageInfo.appendChild(messageContent);

            messageBubble.appendChild(messageInfo);
            
            const metadata = document.createElement('div');
            metadata.classList.add('message-metadata');

            const timestamp = document.createElement('span');
            timestamp.textContent = formatTimestamp(msg.timestamp);
            metadata.appendChild(timestamp);

            if (isSent) {
                const checkmark = document.createElement('i');
                checkmark.classList.add('fas', 'fa-check-double', 'checkmark');
                metadata.appendChild(checkmark);
            }
            
            messageBubble.appendChild(metadata);

            chatMessages.appendChild(messageBubble);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

  
    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        const sender = isAnonymous ? anonymousUser : myUsername;

        const newMessage = {
            sender_name: sender,
            message_text: messageText,
        };

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            });
            if (!response.ok) throw new Error('Failed to send message');
            fetchMessages();
            messageInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    
    async function fetchMessages() {
        try {
            const response = await fetch('/api/messages');
            if (!response.ok) throw new Error('Failed to fetch messages');
            const messages = await response.json();
            renderMessages(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });


    fetchMessages();
});
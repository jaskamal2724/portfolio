import { useRef } from 'react';
import Image from 'next/image';

// Technology stack data with logos and names
const technologies = [
  {
    name: 'React JS',
    logo: 'https://imgs.search.brave.com/-wRYfmc8MFTE9dYoFBioZSxfu45QaJyuKfJ3h68gZGM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtMy82/MDAvUmVhY3QuanNf/bG9nby01MTIucG5n',
  },
  {
    name: 'Next JS',
    logo: 'https://imgs.search.brave.com/1iMMj7WurKAKVbBWH5Ewd2etWoyr6bYKbs56XSD35xc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMyLzEvbmV4dC1q/cy1sb2dvLXBuZ19z/ZWVrbG9nby0zMjE4/MDYucG5n',
  },
  {
    name: 'TypeScript',
    logo: 'https://imgs.search.brave.com/b1mza9u8ePJdo9VHfx00bmjzGwVI_b7cLPA1ONSjIL0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRjL1R5cGVzY3Jp/cHRfbG9nb18yMDIw/LnN2Zw',
  },
  {
    name: 'JavaScript',
    logo: 'https://imgs.search.brave.com/1dSdxU2GDlGcxnbNSj_iU83ak0hLBbK9e5btboQV8gI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk5L1Vub2ZmaWNp/YWxfSmF2YVNjcmlw/dF9sb2dvXzIuc3Zn',
  },
  {
    name: 'Node JS',
    logo: 'https://imgs.search.brave.com/oaFGRaXb0-VRGAPDF1uzUObZzwpW4QdclW4QfTKVzE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/dmVjdG9ycy5jb20v/c3RvcmFnZS9pbWFn/ZXMvbm9kZSUyMGpz/JTIwbG9nby5zdmc',
  },
  
  {
    name: 'Tailwind CSS',
    logo: 'https://imgs.search.brave.com/Kf51vaRNMkB9GkhKkveYAzls_TjtIEYKlHJfcznGeTY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVjdG9ybG9nby56/b25lL2xvZ29zL3Rh/aWx3aW5kY3NzL3Rh/aWx3aW5kY3NzLWlj/b24uc3Zn',
  },
  {
    name: 'MongoDB',
    logo: 'https://imgs.search.brave.com/YhcRsxxIwDxgDX0N6L6o4N5EsOzYA_1WMQdY7Vwwwho/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIwLzA4/L01vbmdvREItTG9n/by01MDB4MzEzLnBu/Zw',
  },
  {
    name: 'Supabase',
    logo: 'https://imgs.search.brave.com/z4lAV8eIp1OusjWKE-i7pZfQ4T4z0-55Rhr-UeyNbvI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9z/dXBhYmFzZS01NTRh/Y2ExYy5wbmc_dD0x/NzIwMjQ0NDk0',
  },
  {
    name: 'Prisma',
    logo: 'https://imgs.search.brave.com/3inOajO_32rqYAwn38_yzYWS5rRr3E1MpyHrvOIgUlQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWxvZ292ZWN0/b3JzLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wMS9w/cmlzbWFfbG9nby1m/cmVlbG9nb3ZlY3Rv/cnMubmV0Xy0zMzB4/NDAwLnBuZw',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://imgs.search.brave.com/qfSJQ0lZCWEWv9sY7i9iOYfFQ6Sf0N3XQjqJ2kB23Bk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI5L1Bvc3RncmVz/cWxfZWxlcGhhbnQu/c3Zn',
  },
  {
    name:"Open AI",
    logo:'https://imgs.search.brave.com/rttXvzyH_CMm9o93y0cAxJ2Ewmjm8XZFkAOp15O2d6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY4MTE0MjUw/M29wZW5haS1pY29u/LXBuZy5wbmc'
  }
  // {
  //   name: 'LangChain',
  //   logo: 'https://media.licdn.com/dms/image/D5612AQE_TBqprOzW3A/article-cover_image-shrink_600_2000/0/1693385646740?e=2147483647&v=beta&t=QZA7I2iec5Lq35iegiTsYBoLGnV6zOoHYjuhiU3-qgA',
  // },
  // {
  //   name: 'LangGraph',
  //   logo: 'https://raw.githubusercontent.com/langchain-ai/langgraph/main/docs/docs/_static/favicon.png',
  // },
  // {
  //   name: 'LangFuse',
  //   logo: 'https://avatars.githubusercontent.com/u/127987357?s=280&v=4',
  // },
  // {
  //   name: 'LangSmith',
  //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxr-4OHmxEQ_7T8d-to5-hYNf_J4j_gy1J0JCXqsKJg&s',
  // }
];

const TechStackSection = () => {
  const techStackRef = useRef(null);

  return (
    <section ref={techStackRef} id="tech-stack" className="py-20 bg-black/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Tech Stack</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 rounded-lg bg-black/50 border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 relative mb-3 flex items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="object-contain max-h-16"
                  
                />
              </div>
              <span className="text-sm font-medium text-center text-white/80">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
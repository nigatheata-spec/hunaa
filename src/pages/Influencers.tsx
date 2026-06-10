import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";

interface Inf { id: string; name: string; tagline: string | null; bio: string | null; avatar_url: string | null; }

export default function Influencers() {
  const [items, setItems] = useState<Inf[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("influencers").select("*").eq("is_active", true).then(({ data }) => {
      setItems((data ?? []) as Inf[]);
      setLoading(false);
    });
  }, []);

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="text-gold-gradient">المؤثرون الأذكياء</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">شخصيات ذكاء اصطناعي مصمّمة بعناية لتخاطب الأطفال بلغة قيمية محبّبة، وتجيب على أسئلتهم بأمان وفي إطار تربوي.</p>
        </div>
        {loading ? <p className="text-center text-muted-foreground py-20">جاري التحميل...</p> :
        items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">سيتم تفعيل شخصيات المؤثرين قريباً من لوحة التحكم.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((i) => (
              <Link key={i.id} to={`/influencers/${i.id}`} className="glass-card rounded-2xl p-6 group hover:border-primary/40 transition-all hover:shadow-gold">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold-shine p-[2px]">
                    <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center">
                      {i.avatar_url ? <img src={i.avatar_url} alt={i.name} className="w-full h-full object-cover" /> : <span className="text-2xl font-serif-ar text-primary">{i.name[0]}</span>}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{i.name}</h3>
                    {i.tagline && <p className="text-xs text-muted-foreground">{i.tagline}</p>}
                  </div>
                </div>
                {i.bio && <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{i.bio}</p>}
                <div className="flex items-center gap-2 text-primary text-sm"><MessageCircle className="w-4 h-4" /> ابدأ الحوار</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

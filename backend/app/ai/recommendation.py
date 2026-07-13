from app.core.supabase import supabase


def get_recommendations(max_price: int, guests: int, location: str | None = None):
    result = (
        supabase.table("homestays")
        .select("*")
        .execute()
    )

    homestays = result.data or []

    recommendations = []

    for stay in homestays:

        if location:
            if location.lower() not in stay["location"].lower():
                continue

        score = stay["eco_score"]

        # Budget match
        if stay["price"] <= max_price:
            score += 20

        # Closer price gets more points
        score += max(0, 15 - abs(max_price - stay["price"]) // 200)

        # Location match
        score += 15

        # Eco Features
        if stay["wifi"]:
            score += 3

        if stay["parking"]:
            score += 3

        if stay["breakfast"]:
            score += 5

        if stay["pet_friendly"]:
            score += 4

        recommendations.append({
            **stay,
            "score": score
        })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:3]